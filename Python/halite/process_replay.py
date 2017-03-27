import os
from collections import namedtuple

from sklearn.model_selection import train_test_split

from hlt import NORTH, EAST, SOUTH, WEST, STILL
from replay import Replay
import pickle
import numpy as np
import hashlib

expand_kernel_size = 5
conquer_kernel_size = 13

def equalized_sections(sections, labels):
    bins = np.bincount(labels)
    min_count = bins.min()
    indecies_by_bin = []

    for i in range(5):
        indecies = np.where(labels == i)[0]
        indecies_by_bin.append(indecies[:min_count])

    sections = np.concatenate([sections[indecies] for indecies in indecies_by_bin], axis=0)
    labels = np.concatenate([labels[indecies] for indecies in indecies_by_bin], axis=0)
    return sections, labels


def rotate_all_sections(sections, labels):
    labels_mapping = [NORTH, EAST, SOUTH, WEST, NORTH, EAST, SOUTH]

    more_sectionss = []
    more_labelss = []
    for i, label in enumerate(labels):
        section = sections[i]

        more_sectionss.append([np.rot90(section, k=-j) for j in range(1, 4)])
        if label == STILL:
            more_labelss.append([STILL] * 3)
        else:
            more_labelss.append([labels_mapping[j] for j in range(label+1, label+4)])

    more_sectionss.append(sections)
    more_labelss.append(labels)
    sections = np.concatenate(more_sectionss)
    labels = np.concatenate(more_labelss)
    return sections, labels


Dataset = namedtuple('Dataset', ['sections', 'labels'])
Buckets = namedtuple('Buckets', ['expand', 'conquer'])


def save_data(replay_paths):
    # description = "%s" % (".".join(replay_paths))

    # hash = hashlib.md5(description.encode('utf-8')).hexdigest()
    # pickle_path = os.path.join('data', "%s.pickle")
    # if os.path.exists(pickle_path):
    #     print("%s already saved" % pickle_path)
    #     return

    expand_dataset = Dataset(sections=[], labels=[])
    conquer_dataset = Dataset(sections=[], labels=[])
    buckets = Buckets(expand=expand_dataset, conquer=conquer_dataset)

    for replay_path in replay_paths:
        print("Processing replay %s with kernels %d and %d" % (replay_path, expand_kernel_size, conquer_kernel_size))
        # pickle_path = os.path.join('data/', '%s.%d.%s' % (filename, kernel_size, 'pickle'))

        print("Loading replay %s" % replay_path)
        replay = Replay(replay_path)
        replay.load()
        print(replay)
        print("Combining data ... ")
        replay.combine_data()

        first_stage_limit = replay.find_sections_count_before_first_collision()

        # Expand Data prep
        print("Padding with %d ... " % expand_kernel_size)
        replay.prepare_padded_arrays(expand_kernel_size)
        print("Generating sections for cells with surrounding")
        sections, labels = replay.get_sections_and_labels(own=False)

        print("Collect expand phase. First %d moves." % first_stage_limit)
        expand_sections, expand_labels = sections[:first_stage_limit], labels[:first_stage_limit]
        print("Rotate each section")
        expand_sections, expand_labels = rotate_all_sections(expand_sections, expand_labels)
        buckets.expand.sections.append(expand_sections)
        buckets.expand.labels.append(expand_labels)

        # Conquer Data prep
        # print("Padding with %d ... " % conquer_kernel_size)
        # replay.prepare_padded_arrays(conquer_kernel_size)
        # print("Generating sections for OWN cells with surrounding")
        # sections, labels = replay.get_sections_and_labels(own=True)
        #
        # print("Collect conquer phase. Last %d moves." % (len(sections) - first_stage_limit))
        # conquer_sections, conquer_labels = sections[first_stage_limit:], labels[first_stage_limit:]
        # print("Rotate each section")
        # conquer_sections, conquer_labels = rotate_all_sections(conquer_sections, conquer_labels)
        # buckets.conquer.sections.append(conquer_sections)
        # buckets.conquer.labels.append(conquer_labels)

    # Expand
    expand_dataset = Dataset(
        sections=np.concatenate(buckets.expand.sections, axis=0),
        labels=np.concatenate(buckets.expand.labels, axis=0)
    )

    train_data, test_data, train_labels, test_labels = train_test_split(
        expand_dataset.sections, expand_dataset.labels, train_size=.8)

    print("Equalizing test data and labels")
    # We want testing data to have equal amount of different classes
    # Otherwise accuracy can be spoiled
    test_data, test_labels = equalized_sections(test_data, test_labels)

    print("%d of expand training data, %d of expand testing data" % (len(train_data), len(test_data)))
    expand_data = {
        'train_data': train_data,
        'train_labels': train_labels,
        'test_data': test_data,
        'test_labels': test_labels,
        'kernel_size': expand_kernel_size
    }

    # Conquer
    # conquer_dataset = Dataset(
    #     sections=np.concatenate(buckets.conquer.sections, axis=0),
    #     labels=np.concatenate(buckets.conquer.labels, axis=0)
    # )
    #
    # train_data, test_data, train_labels, test_labels = train_test_split(
    #     conquer_dataset.sections, conquer_dataset.labels, train_size=.8)
    # print("Equalizing train data and labels")
    # train_data, train_labels = equalized_sections(train_data, train_labels)
    # print("Equalizing test data and labels")
    # test_data, test_labels = equalized_sections(test_data, test_labels)
    # print("%d of conquer training data, %d of conquer testing data" % (len(train_data), len(test_data)))
    # conquer_data = {
    #     'train_data': train_data,
    #     'train_labels': train_labels,
    #     'test_data': test_data,
    #     'test_labels': test_labels,
    #     'kernel_size': conquer_kernel_size
    # }
    conquer_data = None

    data = {
        'expand_data': expand_data,
        'conquer_data': conquer_data
    }

    pickle_path = 'data/data.pickle'
    with open(pickle_path, 'wb') as f:
        print("Saving to %s" % pickle_path)
        pickle.dump(data, f)
    return data


def main():
    replay_paths = [os.path.join(root, file) for root, dirs, files in os.walk("./data") for file in files if file.endswith(".json")]
    replay_paths = replay_paths[:5]
    save_data(replay_paths)


if __name__ == '__main__':
    main()
