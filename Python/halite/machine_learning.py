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


def get_classifier():
    # (kernel_size * kernel_size, 3)
    feature_columns = [layers.real_valued_column("", dimension=3)]
    return DNNClassifier(feature_columns=feature_columns,
                         hidden_units=[100, 200],
                         n_classes=5,
                         model_dir="saved_model",
                         optimizer=AdamOptimizer(),
                         dropout=0.5
                         )
    # return SKCompat(Estimator(model_fn=conv_model, model_dir='saved_model'))


def load_data_from_pickle():
    filenames = filter(lambda name: name.endswith('.pickle'), os.listdir("./data"))
    filename = list(filenames)[0]
    pickle_path = os.path.join('data', filename)

    return load_dataset(pickle_path)


stop_when_finish = False
def main():
    # global stop_when_finish
    # def signal_handler(signal, frame):
    #     print('You pressed Ctrl+C!')
        # stop_when_finish = True
    # signal.signal(signal.SIGINT, signal_handler)

    datasets = load_data_from_pickle()

    classifier = get_classifier()
    while not stop_when_finish:
        classifier.fit(x=datasets.train.data, y=datasets.train.target,
                       batch_size=150, steps=5000)

        score = metrics.accuracy_score(
            datasets.test.target, list(classifier.predict(datasets.test.data)))
        print('Test Accuracy: {0:f}%'.format(score * 100))


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


if __name__ == '__main__':
    main()
    # analise()
