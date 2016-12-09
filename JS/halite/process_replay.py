import numpy as np
from pprint import pprint
import json
import os
# from tkinter import *
import time
from functools import partial
import colorsys
import pygame

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
        self.kernel_size = None
        self.moves_padded = None
        self.combined_data = None
        self.combined_data_padded = None

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
        self.max_production = self.productions.max()
        self.frames = np.array(data['frames'])
        self.moves = np.array(data['moves'])

    def combine_data(self):
        self.combined_data = list(self.combined_data_generator_all_frames())

    def prepare_padded_arrays(self, kernel_size):
        self.kernel_size = kernel_size
        ext_size = (kernel_size-1)//2
        self.moves_padded = np.pad(self.moves, ext_size, 'wrap')
        self.combined_data_padded = [np.pad(frame_data, ext_size, 'wrap') for frame_data in self.combined_data]

    def combined_data_generator_all_frames(self):
        for frame_index in range(len(self.frames)):
            yield self.combined_data_for_frame(frame_index)

    def combined_data_for_frame(self, frame_index):
        res = np.zeros( (self.height, self.width, 3) )
        for y in range(self.height):
            for x in range(self.width):
                # 0 owner type (0 - my, 100 - map, 200 - enemy)
                # 1 production
                # 3 strength
                site = self.frames[frame_index][y][x]
                owner, strength = site
                if owner == self.winner_index + 1:
                    owner_type = 0
                elif owner == 0:
                    owner_type = 100
                else:
                    owner_type = 200
                res[y][x] = (owner_type, self.productions[y][x], strength)
        return res

    def get_section(self, frame_index, y, x):
        return self.combined_data_padded[frame_index][y:y+self.kernel_size, x:x+self.kernel_size]

    def __str__(self):
        return "W: %d, H: %d, #Players: %d, #Frames: %d, Winner: %s (%d)\nUsers: %s\nMax Production: %d" % (
            self.width,
            self.height,
            self.num_players,
            self.num_frames,
            self.winner,
            self.winner_index,
            self.player_names,
            self.max_production)

def wrap_slice_generator(a, kernel_size):
    if kernel_size % 2 == 0:
        raise "Kernel size should be an odd number"

    for y in range(a.shape[0]):
        for x in range(a.shape[1]):
            yield padded_a[y:y+kernel_size, x:x+kernel_size]

def get_first_own_site(replay, frame_index):
    frame = replay.combined_data[0]
    for y in range(replay.height):
        for x in range(replay.width):
            owner_type, production, strength = frame[y][x]
            if owner_type == 0:
                return y, x

def start_frames_animation(replay):
    cell_size = 20

    WHITE = (255, 255, 255)

    pygame.init()
    size = [replay.width * cell_size+1, replay.height * cell_size+1]
    screen = pygame.display.set_mode(size)

    #Loop until the user clicks the close button.
    done = False
    clock = pygame.time.Clock()

    while not done:
        for frame_index in range(replay.num_frames):
            clock.tick(10)

            for event in pygame.event.get(): # User did something
                if event.type == pygame.QUIT: # If user clicked close
                    done=True # Flag that we are done so we exit this loop

            screen.fill(WHITE)

            animate_frame(replay, screen, frame_index, cell_size)

            pygame.display.flip()

    # Be IDLE friendly
    pygame.quit()

# def percentToHex(percent):
#     return hex(int(percent * 255))[2:].zfill(2)
#
# def hsv_to_rgb(h,s,v):
#     return colorsys.hsv_to_rgb(h, s, v)

def animate_frame(replay, screen, frame_index, cell_size):
    frame = replay.combined_data_for_frame(frame_index)
    for y in range(replay.height):
        for x in range(replay.width):
            # fill_color = "white"
            owner_type, production, strength = frame[y][x]

            # s = production/255 * (1 - 0.45) + 0.45
            # v = 0.55 - production/255 * (.55 - .17)
            v = 1 - production / (replay.max_production)
            s = 0
            production_fill_color = colorsys.hsv_to_rgb(0, s, v)

            # outline_color = "#aaa"
            if owner_type == 0: # my
                owner_color = pygame.Color("#c4003e")
                outline_color = owner_color
                # fill_color = "#%s0000" % hex(255-int(strength))[2:].zfill(2)
                # outline_color = "#ff0000"
            elif owner_type == 100: # map
                owner_color = pygame.Color("#363636")
                outline_color = production_fill_color

                # fill_color = "#%s" % (hex(255-int(strength))[2:].zfill(2)*3)
                # outline_color = "#aaaaaa"
            elif owner_type == 200: # enemy
                owner_color = pygame.Color("#4580ff")
                outline_color = owner_color
                # fill_color = "#0000%s" % hex(255-int(strength))[2:].zfill(2)
                # outline_color = "#0000ff"

            #L 0.17 (more) - .55 (less)
            #S .45 (less) - 1 (more)
            pygame.draw.rect(screen, production_fill_color, [
                y*cell_size, x*cell_size,
                y*cell_size+cell_size-1, x*cell_size+cell_size-1])

            inner_rect_size = strength / 255 * cell_size
            padding = (cell_size - inner_rect_size) / 2
            pygame.draw.rect(screen, owner_color, [
                y*cell_size+padding, x*cell_size+padding,
                y*cell_size+cell_size-padding, x*cell_size+cell_size-padding
            ])

if __name__ == '__main__':
    for filename in os.listdir("./data")[:1]:
        replay = Replay('./data/%s' % filename)
        replay.load()
        replay.combine_data()
        replay.prepare_padded_arrays(3)
        print(replay)
        # print(get_first_own_site(replay, 0))
        start_frames_animation(replay)





    # test_a1 = np.reshape(np.arange(5*5), (5, 5))
    # for section in wrap_slice_generator(test_a1, 3):
    #     print(section)

    # start_time = time.clock()
    # ms_time = (time.clock() - start_time) * 1000
    # print("%f ms" % ms_time)
