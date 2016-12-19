# import sys

import numpy as np
import os
import pickle

import logging

import tensorflow as tf
from sklearn.model_selection import train_test_split
from tensorflow.contrib import layers
from tensorflow.contrib.learn import DNNClassifier
from tensorflow.contrib.learn.python.learn.datasets.base import Dataset, Datasets
from sklearn import metrics

import signal
import sys

from tensorflow.python.training.adadelta import AdadeltaOptimizer
from tensorflow.python.training.adam import AdamOptimizer

logging.getLogger().setLevel(logging.INFO)

num_labels = 5


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


def get_validation_monitor(test_set):
    validation_metrics = {"accuracy": tf.contrib.metrics.streaming_accuracy,
                          "precision": tf.contrib.metrics.streaming_precision,
                          "recall": tf.contrib.metrics.streaming_recall}
    validation_monitor = tf.contrib.learn.monitors.ValidationMonitor(
        test_set.data,
        test_set.target,
        every_n_steps=50,
        metrics=validation_metrics,
        early_stopping_metric="loss",
        early_stopping_metric_minimize=True,
        early_stopping_rounds=200)

    return validation_monitor


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


def load_data_from_pickle():
    filenames = filter(lambda name: name.endswith('.pickle'), os.listdir("./data"))
    filename = list(filenames)[0]
    pickle_path = os.path.join('data', filename)

    return load_dataset(pickle_path)


def main():
    stop_when_finish = False

    datasets = load_data_from_pickle()

    classifier = get_classifier()
    max_score = 0
    while not stop_when_finish:
        classifier.fit(x=datasets.train.data,
                       y=datasets.train.target,
                       monitors=[get_validation_monitor(datasets.test)],
                       steps=1000)

        score = classifier.evaluate(x=datasets.test.data,
                                    y=datasets.test.target)["accuracy"]
        print("Accuracy: {0:f}".format(score))

        if score > max_score:
            max_score = score
        elif max_score > (score + 0.001):
            stop_when_finish = True
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

if __name__ == '__main__':
    main()
    # analise()
