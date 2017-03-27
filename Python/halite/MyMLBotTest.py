from MyMLBot import Solver
from hlt import Square, GameMap, grouper
import numpy as np


class FakeGameMap(GameMap):
    def __init__(self, size):
        self.width, self.height = size, size
        self.contents = None

    def update_frame(self, owners, strengths, productions):
        self.contents = [[Square(x, y, owner, strength, production)
                          for x, (owner, strength, production)
                          in enumerate(zip(owner_row, strength_row, production_row))]
                         for y, (owner_row, strength_row, production_row)
                         in enumerate(zip(grouper(owners, self.width),
                                          grouper(strengths, self.width),
                                          grouper(productions, self.width)))]

    def get_frame(self, map_string=None):
        pass


productions = np.array([
    [1, 2, 1, 2, 1],
    [1, 1, 2, 2, 1],
    [1, 1, 2, 2, 1],
    [1, 1, 1, 3, 1],
    [1, 2, 1, 3, 2]
]).flatten()

owners = np.array([
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0],
]).flatten()

strengths = np.array([
    [1, 1, 1, 0, 0],
    [1, 5, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 6, 1],
    [0, 0, 1, 1, 1],
]).flatten()

fake_map = FakeGameMap(5)
fake_map.update_frame(owners, strengths, productions)
solver = Solver(1, fake_map)
moves = solver.process_frame()
print(moves)
