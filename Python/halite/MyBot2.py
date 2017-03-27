import random

# TODO Change back to htl
from hlt import NORTH, EAST, SOUTH, WEST, STILL, Move, get_init, send_init, send_frame
# from hlt_debug import NORTH, EAST, SOUTH, WEST, STILL, Move, get_init, send_init, send_frame

DIRECTIONS = (NORTH, EAST, SOUTH, WEST, STILL)

def direction_from_to_square(_map, sq_from, sq_to):
    (min_x_distance, x_direction), (min_y_distance, y_direction) = get_xy_distances_and_direction(_map, sq_from, sq_to)
    if min_x_distance > min_y_distance:
        return x_direction
    else:
        return y_direction


def get_xy_distances_and_direction(_map, sq_from, sq_to):
    # For X
    if sq_from.x > sq_to.x:
        direct_direction = WEST
    else:
        direct_direction = EAST
    direct_distance = abs(sq_from.x - sq_to.x)

    west_move_over_border = sq_from.x + _map.width - sq_to.x
    east_move_over_border = sq_to.x + _map.width - sq_from.x
    min_x_distance = min(direct_distance, west_move_over_border, east_move_over_border)

    if min_x_distance == direct_distance:
        x_direction = direct_direction
    elif min_x_distance == west_move_over_border:
        x_direction = WEST
    else:
        x_direction = EAST

    # For Y
    if sq_from.y > sq_to.y:
        direct_direction = NORTH
    else:
        direct_direction = SOUTH
    direct_distance = abs(sq_from.y - sq_to.y)

    north_move_over_border = sq_from.y + _map.height - sq_to.y
    south_move_over_border = sq_to.y + _map.height - sq_from.y
    min_y_distance = min(direct_distance, north_move_over_border, south_move_over_border)

    if min_y_distance == direct_distance:
        y_direction = direct_direction
    elif min_y_distance == west_move_over_border:
        y_direction = NORTH
    else:
        y_direction = SOUTH

    return (min_x_distance, x_direction), (min_y_distance, y_direction)


def attack_move(square, immediate_enemy_neighbors):
    strengths = [sq_dir[0].strength for sq_dir in immediate_enemy_neighbors]
    min_index = strengths.index(min(strengths))
    if immediate_enemy_neighbors[min_index][0].strength + 1 < square.strength:
        return Move(square, immediate_enemy_neighbors[min_index][1])  # Should be same as direction
    # TODO Think of overkill logic
    return Move(square, STILL)


def neutral_cell_score(neighbor_square, square):
    return (50 - (neighbor_square.strength - square.strength)) * neighbor_square.production


def expand_move(square, immediate_neutral_neighbors):
    immediate_neutral_neighbors = sorted(immediate_neutral_neighbors,
                                         key=lambda a: neutral_cell_score(a[0], square),
                                         reverse=True)
    # productions = [sq_dir[0].production for sq_dir in immediate_neutral_neighbors]
    # max_index = productions.index(max(productions))
    # for neighbor in immediate_neutral_neighbors[:2]:
    if immediate_neutral_neighbors[0][0].strength < square.strength:
        return Move(square, immediate_neutral_neighbors[0][1])
    return Move(square, STILL)


def is_enemy(square):
    return square.owner > 0 and square.owner != my_id


def is_neutral(square):
    return square.owner == 0


def is_my(square):
    return square.owner == my_id


def is_mature_for_close_range_battle(strength):
    return strength > 10


def is_mature_for_close_range_conquer(strength):
    return strength > 10


def is_mature_to_start_moving_radially_out(strength):
    return strength > 50


def choose_best_neutral(neighbors, square):
    return sorted(neighbors,
           key=lambda a: neutral_cell_score(a, square),
           reverse=True)[0]


def make_move(square):
    x, y, owner, strength, production = square

    if strength == 0:
        return Move(square, STILL)

    immediate_enemy_neighbors = [(neighbor, dir) for dir, neighbor in enumerate(game_map.neighbors(square))
                                 if is_enemy(neighbor) and neighbor.production > 0]
    if len(immediate_enemy_neighbors) > 0:
        return attack_move(square, immediate_enemy_neighbors)

    immediate_neutral_neighbors = [(neighbor, dir) for dir, neighbor in enumerate(game_map.neighbors(square))
                                   if is_neutral(neighbor) and neighbor.production > 0]
    if len(immediate_neutral_neighbors) > 0:
        return expand_move(square, immediate_neutral_neighbors)

    close_range_enemy_neighbors = [neighbor for neighbor in game_map.neighbors(square, n=5) if is_enemy(neighbor)]
    if len(close_range_enemy_neighbors) > 0 and is_mature_for_close_range_battle(strength):
        return Move(square, direction_from_to_square(game_map, square, close_range_enemy_neighbors[0]))

    close_range_neutral_neighbors = [neighbor for neighbor in game_map.neighbors(square, n=5) if is_neutral(neighbor)]
    if len(close_range_neutral_neighbors) > 0 and is_mature_for_close_range_conquer(strength):
        best_neighbor = choose_best_neutral(close_range_neutral_neighbors, square)
        return Move(square, direction_from_to_square(game_map, square, best_neighbor))

    # Go Radially from origin location if enough
    if is_mature_to_start_moving_radially_out(strength):
        return Move(square, direction_from_to_square(game_map, origin_square, square))

    return Move(square, STILL)


my_id, game_map = get_init()
send_init("Worse bot")

origin_square = None
while True:
    game_map.get_frame()
    my_squares = [square for square in game_map if is_my(square)]
    if origin_square is None:
        origin_square = my_squares[0]

    moves = [make_move(square) for square in my_squares]
    send_frame(moves)

# def test():
#     FakeMap = namedtuple('FakeMap', ['width', 'height'])
#     FakeSquare = namedtuple('FakeSquare', ['x', 'y'])
#     fake_map = FakeMap(width=10, height=10)
#
#     res = direction_from_to_square(fake_map, FakeSquare(x=1, y=1), FakeSquare(x=5, y=3))
#     pass
#
# test()