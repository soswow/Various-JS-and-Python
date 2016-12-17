import os

from sklearn.model_selection import train_test_split

from replay import Replay
import pickle
import numpy as np
import hashlib


kernel_size = 5


def equalized_sections(replay):
    bins = np.bincount(replay.labels)
    min_count = bins.min()
    indecies_by_bin = []

    for i in range(5):
        indecies = np.where(replay.labels == i)[0]
        indecies_by_bin.append(indecies[:min_count])

    sections = np.concatenate([replay.sections[indecies] for indecies in indecies_by_bin], axis=0)
    labels = np.concatenate([replay.labels[indecies] for indecies in indecies_by_bin], axis=0)
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
        replay_path = os.path.join('data/', filename)
        replay = Replay(replay_path)
        replay.load()
        print(replay)
        print("Combining data ... ")
        replay.combine_data()
        print("Padding with %d ... " % kernel_size)
        replay.prepare_padded_arrays(kernel_size)
        print("Generating sections for own cells with surrounding")
        replay.load_sections_and_labels()
        sections, labels = equalized_sections(replay)

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
        pickle.dump(data, f)
    return data


def main():
    filenames = os.listdir("./data")[:20]
    save_data(filenames)


if __name__ == '__main__':
    main()
