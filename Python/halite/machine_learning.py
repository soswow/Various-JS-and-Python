# import sys

import numpy as np
import os
import pickle

import logging

import tensorflow as tf
# from keras.optimizers import Adagrad, Adadelta
from tensorflow.contrib import layers
from tensorflow.contrib.layers.python.layers import optimizers, contrib_variables
from tensorflow.contrib.learn import DNNClassifier, SKCompat, Estimator, model_fn
from tensorflow.contrib.learn.python.learn.datasets.base import Dataset, Datasets
from tensorflow.contrib.learn.python.learn.estimators import head as head_lib
from tensorflow.python.ops import variable_scope
from sklearn import metrics
from tensorflow.python.training.adadelta import AdadeltaOptimizer
from tensorflow.python.training.adagrad import AdagradOptimizer
from tensorflow.python.training.adam import AdamOptimizer
from tensorflow.python.training.ftrl import FtrlOptimizer
from tensorflow.python.training.gradient_descent import GradientDescentOptimizer
from tensorflow.python.training.rmsprop import RMSPropOptimizer

# from process_replay import kernel_size as image_size

logging.getLogger().setLevel(logging.INFO)


# num_labels = 5
# image_width = image_size
# image_height = image_size


def convert_to_float32(images):
    images = images.astype(np.float32)
    return np.multiply(images, 1.0 / 255.0)


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


# # Create model
# def conv_net(x, weights, biases, dropout):
#     # Reshape input picture
#     x = tf.reshape(x, shape=[-1, image_width, image_height, 4])
#
#     # Convolution Layer
#     conv1 = conv2d(x, weights['wc1'], biases['bc1'])
#     # Max Pooling (down-sampling)
#     conv1 = maxpool2d(conv1, k=2)
#
#     # Convolution Layer
#     conv2 = conv2d(conv1, weights['wc2'], biases['bc2'])
#     # Max Pooling (down-sampling)
#     conv2 = maxpool2d(conv2, k=2)
#
#     # Fully connected layer
#     # Reshape conv2 output to fit fully connected layer input
#     fc1 = tf.reshape(conv2, [-1, weights['wd1'].get_shape().as_list()[0]])
#     fc1 = tf.add(tf.matmul(fc1, weights['wd1']), biases['bd1'])
#     fc1 = tf.nn.relu(fc1)
#     # Apply Dropout
#     fc1 = tf.nn.dropout(fc1, dropout)
#
#     # Output, class prediction
#     out = tf.add(tf.matmul(fc1, weights['out']), biases['out'])
#     return out


def get_classifier():
    # (kernel_size * kernel_size, 3)
    feature_columns = [layers.real_valued_column("", dimension=3)]
    return DNNClassifier(feature_columns=feature_columns,
                         hidden_units=[256, 128],
                         n_classes=5,
                         model_dir="saved_model",
                         # optimizer=AdadeltaOptimizer(learning_rate=0.1)
                         # optimizer=AdamOptimizer()
                         # dropout=0.5
                         )
    # return SKCompat(Estimator(model_fn=conv_model, model_dir='saved_model'))


def get_conv_model(features, labels, mode, params):
    parent_scope = "cnn"  # TODO Need to have two: one for expand, one for conquer

    # features = _get_feature_dict(features)
    head = params.get("head")
    feature_columns = params.get("feature_columns")
    activation_fn = params.get("activation_fn")
    dropout = params.get("dropout")
    learning_rate = params.get("learning_rate")
    optimizer = params.get("optimizer")

    # with variable_scope.variable_scope(
    #                 parent_scope + "/input_from_feature_columns",
    #         values=features.values()) as scope:
    #     net = layers.input_from_feature_columns(
    #         columns_to_tensors=features,
    #         feature_columns=feature_columns,
    #         weight_collections=[parent_scope],
    #         scope=scope)

    with variable_scope.variable_scope(
                    parent_scope + "/convlayer_1",
            values=[features]) as scope:
        net = layers.conv2d(features,
                            num_outputs=32,
                            kernel_size=3,
                            variables_collections=[parent_scope],
                            scope=scope)
        net = layers.max_pool2d(net, 2,
                                stride=1,
                                padding='SAME')

    with variable_scope.variable_scope(
                    parent_scope + "/convlayer_2",
            values=[features]) as scope:
        net = layers.conv2d(features,
                            num_outputs=64,
                            kernel_size=5,
                            padding='VALID',
                            variables_collections=[parent_scope],
                            scope=scope)
        # net = layers.max_pool2d(net, 1,
        #                         stride=1,
        #                         padding='SAME')
    #
    # with variable_scope.variable_scope(
    #                 parent_scope + "/max_pool_1",
    #         values=[net]) as scope:

    shape = net.get_shape()
    net = tf.reshape(net, [-1, shape[3].value], name="reshape_1")

    hidden_units = [256, 128]
    for layer_id, num_hidden_units in enumerate(hidden_units):
        with variable_scope.variable_scope(
                        parent_scope + "/hiddenlayer_%d" % layer_id,
                values=[net]) as scope:
            net = layers.fully_connected(
                net,
                num_hidden_units,
                activation_fn=activation_fn,
                variables_collections=[parent_scope],
                scope=scope)
            if dropout is not None and mode == model_fn.ModeKeys.TRAIN:
                net = layers.dropout(
                    net,
                    keep_prob=(1.0 - dropout))

    with variable_scope.variable_scope(
                    parent_scope + "/logits",
            values=[net]) as scope:
        logits = layers.fully_connected(
            net,
            head.logits_dimension,
            activation_fn=None,
            variables_collections=[parent_scope],
            scope=scope)

    def _train_op_fn(loss):
        """Returns the op to optimize the loss."""
        return optimizers.optimize_loss(
            loss=loss,
            global_step=contrib_variables.get_global_step(),
            learning_rate=learning_rate,
            optimizer=optimizer,
            name=parent_scope,
            # Empty summaries to prevent optimizers from logging the training_loss.
            summaries=[])

    return head.head_ops(features, labels, mode, _train_op_fn, logits)


def _get_feature_dict(features):
    if isinstance(features, dict):
        return features
    return {"": features}


def get_conv_classifier():
    n_classes = 5
    feature_columns = [layers.real_valued_column("", dimension=3)]

    # learning_rate = 1.0
    # optimizer = AdagradOptimizer(learning_rate)
    #
    # learning_rate = 1.0
    # optimizer = AdadeltaOptimizer(learning_rate=learning_rate)

    # ~ 62.55%
    learning_rate = 0.01
    optimizer = AdamOptimizer(learning_rate, epsilon=0.1)

    # learning_rate = 0.05
    # optimizer = GradientDescentOptimizer(learning_rate)

    # learning_rate = 0.1
    # optimizer = RMSPropOptimizer(learning_rate, momentum=0.1)

    # learning_rate = 0.1
    # optimizer = FtrlOptimizer(learning_rate)

    return SKCompat(Estimator(
        model_fn=get_conv_model,
        params={
            'head': head_lib._multi_class_head(  # pylint: disable=protected-access
                n_classes,
                enable_centered_bias=False),
            'feature_columns': feature_columns,
            'activation_fn': tf.nn.relu,
            'learning_rate': learning_rate,
            'optimizer': optimizer
        },
        model_dir='saved_model'))


def load_data_from_pickle():
    # filenames = filter(lambda name: name.endswith('.pickle'), os.listdir("./data"))
    # filename = list(filenames)[0]
    # pickle_path = os.path.join('data', filename)
    pickle_path = "data/data.pickle"
    with open(pickle_path, 'rb') as f:
        save = pickle.load(f)
        save['expand_data']['train_data'] = convert_to_float32(save['expand_data']['train_data'])
        save['expand_data']['test_data'] = convert_to_float32(save['expand_data']['test_data'])
        # save['expand_data']['train_data'] = convert_to_float32(save['expand_data']['train_data'])
        return save


def main():
    stop_when_finish = False

    if not os.path.exists("saved_model"):
        os.makedirs("saved_model")

    data = load_data_from_pickle()
    expand_data = data['expand_data']

    classifier = get_conv_classifier()
    max_score = 0
    while not stop_when_finish:
        classifier.fit(x=expand_data['train_data'],
                       y=expand_data['train_labels'],
                       batch_size=100,
                       # monitors=[get_validation_monitor(datasets.test)],
                       steps=1000)

        score = classifier.score(x=expand_data['test_data'],
                                 y=expand_data['test_labels'])["accuracy"]
        print("Accuracy: {0:f}".format(score))

        if score > max_score:
            max_score = score
        elif max_score > (score + 0.1):
            print("ARR going down!!")
            stop_when_finish = True
        print('Test Accuracy: {0:f}%'.format(score * 100))
    analise()


def analise():
    datasets = load_data_from_pickle()
    classifier = get_conv_classifier()
    given_answers = list(classifier.predict(datasets.test.data)['classes'])

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
    # analise()
