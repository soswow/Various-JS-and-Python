# import hlt_debug
import sys
import hlt
from hlt import Move
from machine_learning import get_classifier
from process_replay import kernel_size
import numpy as np
import time

import logging
logging.getLogger().setLevel(logging.ERROR)


def convert_to_float32(images):
    images = images.astype(np.float32)
    return np.multiply(images, 1.0 / 255.0)


class Solver:
    def __init__(self, own_id, game_map):
        self.classifier = get_classifier()
        self.own_id = own_id
        self.game_map = game_map

    def convert_square_to_model_format(self, square):
        x, y, owner, strength, production = square
        if owner == self.own_id:
            owner_type = 0
        elif owner == 0:
            owner_type = 127
        else:
            owner_type = 255
        return owner_type, production, strength

    def get_section(self, square):
        ext_size = (kernel_size - 1) // 2
        section = np.array(
            [self.convert_square_to_model_format(neighbor)
             for neighbor in self.game_map.neighbors(square, ext_size, include_self=True, star_shape=False)]
        )
        return section.reshape(kernel_size, kernel_size, 3)

    def process_frame(self):
        my_squares = [square for square in self.game_map if square.owner == self.own_id]
        sections = np.array(
            [self.get_section(square) for square in my_squares]
        )

        # start = time.clock()
        # x = convert_to_float32(sections)
        predicted_moves = list(self.classifier.predict(sections))
        # end = time.clock()
        return [Move(square=square, direction=predicted_moves[i]) for i, square in enumerate(my_squares)]


def main():
    own_id, game_map = hlt.get_init()
    hlt.send_init("MyMLBot")
    solver = Solver(own_id, game_map)
    while True:
        game_map.get_frame()
        moves = solver.process_frame()
        hlt.send_frame(moves)

if __name__ == "__main__":
    main()
