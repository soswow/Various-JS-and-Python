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

logging.getLogger().setLevel(logging.INFO)

num_labels = 5


def convert_to_float32(images):
    images = images.astype(np.float32)
    return np.multiply(images, 1.0 / 255.0)


def load_dataset(pickle_file):
    with open(pickle_file, 'rb') as f:
        save = pickle.load(f)
        dataset = save['sections']
        labels = save['labels']

        # dataset = convert_to_float32(dataset)

        print("Dataset size: %d" % len(dataset))
        if len(dataset) != len(labels):
            raise Exception("Dataset and labels length should match")
        del save  # hint to help gc free up memory

        train_data, test_data, train_labels, test_labels = train_test_split(dataset, labels, train_size=.8)

        train_dataset = Dataset(data=train_data, target=train_labels)
        test_dataset = Dataset(data=test_data, target=test_labels)

        return Datasets(train=train_dataset, test=test_dataset, validation=None)


def max_pool_2x2(tensor_in):
    return tf.nn.max_pool(
        tensor_in, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding='SAME')


def conv_model(feature, target, mode):
    """2-layer convolution model."""
    # Convert the target to a one-hot tensor of shape (batch_size, 5) and
    # with a on-value of 1 for each one-hot vector of length 10.
    target = tf.one_hot(target, 5, 1, 0)

    with tf.variable_scope('conv_layer1'):
        h_conv1 = layers.convolution(feature, 32, kernel_size=[5, 5],
                                     activation_fn=tf.nn.relu)
        h_pool1 = max_pool_2x2(h_conv1)

        h_pool1_flat = tf.reshape(h_pool1, [-1, 3 * 3 * 32])

    # with tf.variable_scope('conv_layer2'):
    #     h_conv2 = layers.convolution(h_pool1, 64, kernel_size=[5, 5],
    #                                  activation_fn=tf.nn.relu)
    #     h_pool2 = max_pool_2x2(h_conv2)
    #     # reshape tensor into a batch of vectors
    #     h_pool2_flat = tf.reshape(h_pool2, [-1, 4 * 4 * 64])

    # Densely connected layer with 5 * 5 * 32 neurons.
    fully_connected = layers.fully_connected(h_pool1_flat, 1024, activation_fn=tf.nn.relu)
    fully_connected = layers.dropout(fully_connected, keep_prob=0.5,
                                     is_training=mode == tf.contrib.learn.ModeKeys.TRAIN)

    # Compute logits (1 per class) and compute loss.
    logits = layers.fully_connected(fully_connected, 5, activation_fn=None)
    loss = tf.contrib.losses.softmax_cross_entropy(logits, target)

    # Create a tensor for training op.
    train_op = layers.optimize_loss(
        loss, tf.contrib.framework.get_global_step(), optimizer='Adam',
        learning_rate=0.001)

    return tf.argmax(logits, 1), loss, train_op


def get_classifier():
    # (kernel_size * kernel_size, 3)
    feature_columns = [layers.real_valued_column("", dimension=3)]
    return DNNClassifier(feature_columns=feature_columns,
                         hidden_units=[500, 1024],
                         n_classes=5,
                         model_dir="saved_model")
    # return SKCompat(Estimator(model_fn=conv_model, model_dir='saved_model'))


def main():
    filenames = filter(lambda name: name.endswith('.pickle'), os.listdir("./data"))
    filename = list(filenames)[0]
    pickle_path = os.path.join('data', filename)

    datasets = load_dataset(pickle_path)

    classifier = get_classifier()
    classifier.fit(x=datasets.train.data, y=datasets.train.target,
                   batch_size=128, steps=3000)

    score = metrics.accuracy_score(
        datasets.test.target, list(classifier.predict(datasets.test.data)))
    print('Test Accuracy: {0:f}%'.format(score * 100))


if __name__ == '__main__':
    main()
