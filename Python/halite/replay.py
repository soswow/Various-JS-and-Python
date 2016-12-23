import numpy as np
import json

from hlt import STILL


class Replay:
    def __init__(self, path):
        self.path = path
        self.width = 0  # data['width']
        self.height = 0  # data['height']
        self.num_players = 0  # data['num_players']
        self.num_frames = 0  # data['num_frames']
        self.player_names = []  # data['player_names']
        self.productions = np.array([])
        self.frames = np.array([])
        self.moves = np.array([])
        self.kernel_size = None
        self.combined_data = None
        self.combined_data_padded = None
        self.winner = None
        self.winner_index = None
        self.max_production = 0

    def load(self):
        with open(self.path, 'r') as data_file:
            data = json.load(data_file)
        self.width = data['width']
        self.height = data['height']
        self.num_players = data['num_players']
        self.num_frames = data['num_frames']
        self.player_names = list(map(lambda s: s.split(' ')[0], data['player_names']))
        self.productions = np.array(data['productions'])
        self.max_production = self.productions.max()
        self.frames = np.array(data['frames'])
        self.moves = np.array(data['moves'])

        self.winner = self.path.split('-')[1]
        for i, name in enumerate(self.player_names):
            if name.startswith(self.winner):
                self.winner_index = i
                break

    def combine_data(self):
        self.combined_data = np.array(list(self.combined_data_generator_all_frames()))

    def combined_data_generator_all_frames(self):
        for frame_index in range(len(self.frames)):
            yield self.combined_data_for_frame(frame_index)

    def combined_data_for_frame(self, frame_index):
        res = np.zeros((self.height, self.width, 3))
        for y in range(self.height):
            for x in range(self.width):
                # 0 owner type (0 - my, 127 - map, 255 - enemy)
                # 1 production
                # 3 strength
                site = self.frames[frame_index][y][x]
                production = self.productions[y][x]
                # production = int((production/self.max_production) * 255)
                owner, strength = site
                if owner == self.winner_index + 1:
                    owner_type = 0
                elif owner == 0:
                    owner_type = 127
                else:
                    owner_type = 255
                res[y][x] = (owner_type, production, strength)
        return res

    def prepare_padded_arrays(self, kernel_size):
        if self.combined_data is None:
            raise Exception("First call replay.combine_data()")
        self.kernel_size = kernel_size
        ext_size = (kernel_size - 1) // 2

        padding = ((0, 0), (ext_size, ext_size), (ext_size, ext_size), (0, 0))
        self.combined_data_padded = np.pad(self.combined_data, padding, 'wrap')

    def find_sections_count_before_first_collision(self):
        moves_counter = 0
        for frame_index, frame in enumerate(self.frames[:-1]):
            for y in range(self.height):
                for x in range(self.width):
                    owner_id, strength = frame[y][x]
                    if owner_id == 0:
                        continue
                    moves_counter += 1

                    move = self.moves[frame_index][y][x]
                    dx, dy = ((0, -1), (1, 0), (0, 1), (-1, 0), (0, 0))[move]
                    move_to_owner_id = self.frames[frame_index + 1][(y + dy) % self.height][(x + dx) % self.width][0]
                    if owner_id != move_to_owner_id and move_to_owner_id != 0:
                        return moves_counter

    def get_section(self, frame_index, y, x):
        if self.combined_data_padded is None:
            raise Exception("First call replay.prepare_padded_arrays()")
        return self.combined_data_padded[frame_index][y:y + self.kernel_size, x:x + self.kernel_size]

    def locations_generator(self, own=True):
        for frame_index, frame in enumerate(self.combined_data):
            for y in range(self.height):
                for x in range(self.width):
                    owner_type, production, strength = frame[y][x]
                    if own and owner_type == 0:  # If own requested and it is own
                        yield frame_index, y, x
                    elif not own and owner_type == 255:  # If not own only requested and it's enemies
                        yield frame_index, y, x

    def sections_generator(self, own=True):
        for frame_index, y, x in self.locations_generator(own=own):
            if frame_index < len(self.moves):
                # We want all moves in the first part of the game and then sparsely
                # if frame_index < 40 or frame_index % 2 == 0:
                yield self.get_section(frame_index, y, x)

    def labels_generator(self, own=True):
        for frame_index, y, x in self.locations_generator(own=own):
            if frame_index < len(self.moves):
                # We want all moves in the first part of the game and then sparsely
                # if frame_index < 40 or frame_index % 2 == 0:
                yield self.moves[frame_index][y][x]

    def get_sections_and_labels(self, own=True):
        sections = np.array(list(self.sections_generator(own)))
        labels = np.array(list(self.labels_generator(own)))
        return sections, labels

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
