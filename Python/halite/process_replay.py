import os

from sklearn.model_selection import train_test_split

from hlt import NORTH, EAST, SOUTH, WEST, STILL
from replay import Replay
import pickle
import numpy as np
import hashlib


kernel_size = 13


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




def save_data(filenames):
    description = "%s.%d" % (".".join(filenames), kernel_size)

    hash = hashlib.md5(description.encode('utf-8')).hexdigest()
    pickle_path = os.path.join('data', "%s.pickle" % hash)
    if os.path.exists(pickle_path):
        print("%s already saved" % pickle_path)
        return

    sectionss = []
    labelss = []

    for filename in filenames:
        print("Processing replay %s with kernel %d" % (filename, kernel_size))
        # pickle_path = os.path.join('data/', '%s.%d.%s' % (filename, kernel_size, 'pickle'))

        print("Loading replay %s" % filename)
        replay_path = os.path.join('data/erdman/', filename)
        replay = Replay(replay_path)
        replay.load()
        print(replay)
        print("Combining data ... ")
        replay.combine_data()
        print("Padding with %d ... " % kernel_size)
        replay.prepare_padded_arrays(kernel_size)
        print("Generating sections for own cells with surrounding")
        replay.load_sections_and_labels()
        sections, labels = replay.sections, replay.labels
        print("Rotating each section")
        sections, labels = rotate_all_sections(sections, labels)
        print("Equalizing all labels")  # Maybe this is not needed?
        sections, labels = equalized_sections(sections, labels)

        sectionss.append(sections)
        labelss.append(labels)

    sections = np.concatenate(sectionss, axis=0)
    labels = np.concatenate(labelss, axis=0)

    train_data, test_data, train_labels, test_labels = train_test_split(sections, labels, train_size=.8)

    data = {
        'train_data': train_data,
        'train_labels': train_labels,
        'test_data': test_data,
        'test_labels': test_labels
        # 'width': replay.width,
        # 'height': replay.height,
        # 'max_production': replay.max_production,
        # 'kernel_size': replay.kernel_size
    }
    with open(pickle_path, 'wb') as f:
        print("Saving to %s" % pickle_path)
        pickle.dump(data, f)
    return data


def main():
    filenames = os.listdir("./data/erdman")[:4]
    save_data(filenames)


if __name__ == '__main__':
    main()
