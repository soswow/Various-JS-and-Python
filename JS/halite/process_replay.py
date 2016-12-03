import numpy as np
from pprint import pprint
import json
import os

import time

class Replay:
    def __init__(self, path):
        self.path = path
        self.width = 0 #data['width']
        self.height = 0 #data['height']
        self.num_players = 0 #data['num_players']
        self.num_frames = 0 #data['num_frames']
        self.player_names = [] #data['player_names']
        self.productions = np.array([])
        self.frames = np.array([])
        self.moves = np.array([])

    def load(self):
        with open(self.path) as data_file:
            data = json.load(data_file)
        self.winner = data['winner']
        self.winner_index = data['winner_index']
        self.width = data['width']
        self.height = data['height']
        self.num_players = data['num_players']
        self.num_frames = data['num_frames']
        self.player_names = data['player_names']
        self.productions = np.array(data['productions'])
        self.frames = np.array(data['frames'])
        self.moves = np.array(data['moves'])

    def prepare_padded_arrays(self, kernel_size):
        self.kernel_size = kernel_size
        ext_size = (kernel_size-1)//2
        self.productions_padded = np.pad(self.productions, ext_size, 'wrap')
        self.frames_padded = np.pad(self.frames_padded, ext_size, 'wrap')
        self.moves_padded = np.pad(self.moves_padded, ext_size, 'wrap')

    def __str__(self):
        return "W: %d, H: %d, #Players: %d, #Frames: %d, Winner: %s (%d)\nUsers: %s" % (
            self.width,
            self.height,
            self.num_players,
            self.num_frames,
            self.winner,
            self.winner_index,
            self.player_names)

def wrap_slice_generator(a, kernel_size):
    if kernel_size % 2 == 0:
        raise "Kernel size should be an odd number"

    for y in range(a.shape[0]):
        for x in range(a.shape[1]):
            yield padded_a[y:y+kernel_size, x:x+kernel_size]

if __name__ == '__main__':
    for filename in os.listdir("./data"):
        replay = Replay('./data/%s' % filename)
        replay.load()
        print(replay)

    # test_a1 = np.reshape(np.arange(5*5), (5, 5))
    # for section in wrap_slice_generator(test_a1, 3):
    #     print(section)

    # start_time = time.clock()
    # ms_time = (time.clock() - start_time) * 1000
    # print("%f ms" % ms_time)
