# import sys

import numpy as np
import os
import pickle

import logging

import tensorflow as tf
from keras.callbacks import EarlyStopping
from keras.optimizers import SGD
from keras.utils import np_utils
from sklearn.model_selection import train_test_split
from tensorflow.contrib import layers
from tensorflow.contrib.learn import DNNClassifier
from tensorflow.contrib.learn.python.learn.datasets.base import Dataset, Datasets
from sklearn import metrics
from tensorflow.contrib.learn.python.learn.metric_spec import MetricSpec

from process_replay import kernel_size as image_size

import signal
import sys

from tensorflow.python.training.adadelta import AdadeltaOptimizer
from tensorflow.python.training.adam import AdamOptimizer

from keras.models import Sequential
from keras.layers import Dense, Activation, Input, Convolution2D, GlobalMaxPooling1D, Dropout, GlobalMaxPooling2D, \
    MaxPooling2D, Flatten, Reshape, LocallyConnected2D

logging.getLogger().setLevel(logging.INFO)

num_labels = 5
image_width = image_size
image_height = image_size


def convert_to_float32(images):
    images = images.astype(np.float32)
    return np.multiply(images, 1.0 / 255.0)


def load_dataset(pickle_file):
    with open(pickle_file, 'rb') as f:
        save = pickle.load(f)
        train_data = save['train_data']
        train_labels = save['train_labels']
        test_data = save['test_data']
        test_labels = save['test_labels']

        # dataset = convert_to_float32(dataset)

        print("Train dataset size: %d" % len(train_data))
        print("Test dataset size: %d" % len(test_data))
        # if len(dataset) != len(labels):
        #     raise Exception("Dataset and labels length should match")
        del save  # hint to help gc free up memory

        train_dataset = Dataset(data=train_data, target=train_labels)
        test_dataset = Dataset(data=test_data, target=test_labels)

        return Datasets(train=train_dataset, test=test_dataset, validation=None)


#
# def get_validation_monitor(test_set):
#     validation_metrics = {
#         "accuracy": MetricSpec(
#             metric_fn=tf.contrib.metrics.streaming_accuracy,
#             prediction_key="classes"),
#         # "precision": MetricSpec(
#         #     metric_fn=tf.contrib.metrics.streaming_precision,
#         #     prediction_key="classes"),
#         # "recall": MetricSpec(
#         #     metric_fn=tf.contrib.metrics.streaming_recall,
#         #     prediction_key="classes")
#     }
#     validation_monitor = tf.contrib.learn.monitors.ValidationMonitor(
#         test_set.data,
#         test_set.target,
#         every_n_steps=100,
#         metrics=validation_metrics,
#         early_stopping_metric="loss",
#         early_stopping_metric_minimize=True,
#         early_stopping_rounds=200)
#
#     return validation_monitor


def conv2d(x, W, b, strides=1):
    # Conv2D wrapper, with bias and relu activation
    x = tf.nn.conv2d(x, W, strides=[1, strides, strides, 1], padding='SAME')
    x = tf.nn.bias_add(x, b)
    return tf.nn.relu(x)


def maxpool2d(x, k=2):
    # MaxPool2D wrapper
    return tf.nn.max_pool(x, ksize=[1, k, k, 1], strides=[1, k, k, 1],
                          padding='SAME')


# Create model
def conv_net(x, weights, biases, dropout):
    # Reshape input picture
    x = tf.reshape(x, shape=[-1, image_width, image_height, 4])

    # Convolution Layer
    conv1 = conv2d(x, weights['wc1'], biases['bc1'])
    # Max Pooling (down-sampling)
    conv1 = maxpool2d(conv1, k=2)

    # Convolution Layer
    conv2 = conv2d(conv1, weights['wc2'], biases['bc2'])
    # Max Pooling (down-sampling)
    conv2 = maxpool2d(conv2, k=2)

    # Fully connected layer
    # Reshape conv2 output to fit fully connected layer input
    fc1 = tf.reshape(conv2, [-1, weights['wd1'].get_shape().as_list()[0]])
    fc1 = tf.add(tf.matmul(fc1, weights['wd1']), biases['bd1'])
    fc1 = tf.nn.relu(fc1)
    # Apply Dropout
    fc1 = tf.nn.dropout(fc1, dropout)

    # Output, class prediction
    out = tf.add(tf.matmul(fc1, weights['out']), biases['out'])
    return out


def get_classifier():
    # (kernel_size * kernel_size, 3)
    feature_columns = [layers.real_valued_column("", dimension=4)]
    return DNNClassifier(feature_columns=feature_columns,
                         hidden_units=[256, 128],
                         n_classes=5,
                         model_dir="saved_model",
                         # optimizer=AdadeltaOptimizer(learning_rate=0.1)
                         # optimizer=AdamOptimizer()
                         # dropout=0.5
                         )
    # return SKCompat(Estimator(model_fn=conv_model, model_dir='saved_model'))


def load_data_from_pickle():
    filenames = filter(lambda name: name.endswith('.pickle'), os.listdir("./data"))
    filename = list(filenames)[0]
    pickle_path = os.path.join('data', filename)

    return load_dataset(pickle_path)


def using_keras(datasets):
    # X_train = datasets.train.data.reshape(-1, image_size * image_size, 3)
    # X_test = datasets.test.data.reshape(-1, image_size * image_size, 3)
    X_train = datasets.train.data
    X_test = datasets.test.data
    Y_train = np_utils.to_categorical(datasets.train.target, num_labels)
    Y_test = np_utils.to_categorical(datasets.test.target, num_labels)

    # model = Sequential()
    # model.add(Convolution2D(64, 5, 5,
    #                         input_shape=datasets.train.data.shape[1:],
    #                         border_mode='same',
    #                         activation='relu'))
    #
    # model.add(MaxPooling2D(border_mode='same'))
    # model.add(Flatten())
    # model.add(Dense(250, activation='relu'))
    # model.add(Dropout(0.2))
    # model.add(Dense(250, activation='relu'))
    # model.add(Dropout(0.2))
    # model.add(Dense(num_labels))
    # model.add(Activation('softmax'))
    # model.compile(
    #     loss='categorical_crossentropy',
    #     optimizer='sgd',
    #     metrics=['accuracy'])

    model = Sequential()
    model.add(Convolution2D(32, 5, 5,
                            input_shape=datasets.train.data.shape[1:],
                            border_mode='same'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Convolution2D(32, 4, 4))
    model.add(Reshape(target_shape=(32,)))
    model.add(Dense(128, activation='relu'))
    model.add(Dense(64, activation='relu'))
    # model.add(Dense(126, activation='relu'))
    # model.add(Dense(128, activation='relu'))
    model.add(Dense(num_labels, activation='softmax'))
    adam = AdamOptimizer(learning_rate=0.1)
    sgd = SGD(lr=0.5, decay=1e-6, momentum=0.999, nesterov=True)
    model.compile(
        loss='categorical_crossentropy',
        optimizer=sgd,
        metrics=['accuracy']
    )

    # from keras.utils.visualize_util import plot
    # plot(model, to_file='model.png')

    # early_stopping = EarlyStopping(monitor='val_loss', patience=2)

    hist = model.fit(
        X_train, Y_train,
        nb_epoch=10, batch_size=500,
        validation_data=(X_test, Y_test))
    #
    model.evaluate(X_test, Y_test)
    print(hist.history)


def main():
    stop_when_finish = False

    datasets = load_data_from_pickle()

    classifier = get_classifier()
    max_score = 0
    while not stop_when_finish:
        classifier.fit(x=datasets.train.data,
                       y=datasets.train.target,
                       batch_size=150,
                       # monitors=[get_validation_monitor(datasets.test)],
                       steps=2000)

        score = classifier.evaluate(x=datasets.test.data,
                                    y=datasets.test.target)["accuracy"]
        print("Accuracy: {0:f}".format(score))

        if score > max_score:
            max_score = score
        elif max_score > (score + 0.001):
            print("ARR going down!!")
            # stop_when_finish = True
        print('Test Accuracy: {0:f}%'.format(score * 100))
    analise()


def analise():
    datasets = load_data_from_pickle()
    classifier = get_classifier()
    given_answers = list(classifier.predict(datasets.test.data))

    wrong_answer_buckets = np.zeros(5)
    for i, test_data in enumerate(datasets.test.data):
        right_answer = datasets.test.target[i]
        given_answer = given_answers[i]
        if right_answer != given_answer:
            wrong_answer_buckets[right_answer] += 1
    print(wrong_answer_buckets / sum(wrong_answer_buckets))

    confusion_matrix = metrics.confusion_matrix(datasets.test.target, given_answers, range(5))
    print(confusion_matrix)

    cohen_kappa_score = metrics.cohen_kappa_score(datasets.test.target, given_answers, range(5))
    print(cohen_kappa_score)

    jaccard_similarity_score = metrics.jaccard_similarity_score(datasets.test.target, given_answers)
    print(jaccard_similarity_score)

    report = metrics.classification_report(datasets.test.target, given_answers, labels=range(5),
                                           target_names=['NORTH', 'EAST', 'SOUTH', 'WEST', 'STILL'])
    print(report)


# Something is wrong. I have 90% match with NORTH direction. Which is just 0 value.
# With different players, different sizes of kernel. All the same.
# 1. Maybe need to look into data. Randomly look to what sections looks like.
# 2. Also, what about use same data and turn it and re-save.
# 3. Make multi-model with different kernels contributing
# 4. Read Forums
# 5. Randomize choice
# 6. Weigths? Can I make one of the axies in input vector be more important?
# 7. Should I make more layers, with strength for own, enemy and map on different layers?
# 8. Separate datasets into different stages. When there are < N units == starting stage,
# When there are > N units == expansion state.


if __name__ == '__main__':
    main()
    # datasets = load_data_from_pickle()
    # 'train', 'validation', 'test'

    # using_keras(datasets)
    # analise()
