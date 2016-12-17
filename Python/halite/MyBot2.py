from hlt import *
import hlt

DIRECTIONS = (NORTH, EAST, SOUTH, WEST, STILL)


def make_move(square, game_map, myID):
    x, y, owner, strength, production = square

    if strength == 0:
        return Move(square, STILL)

    best_prod_strength_index = -1000

    best_move = STILL

    enemyNeighbourNumber = 0
    for direction in (NORTH, EAST, SOUTH, WEST):
        neighbor = game_map.get_target(square, direction)
        if neighbor.owner != myID:
            enemyNeighbourNumber += 1
            if neighbor.strength < strength + 1:
                index = neighbor.production - neighbor.strength
                if index > best_prod_strength_index:
                    best_move = direction
                    best_prod_strength_index = index

    if enemyNeighbourNumber > 3 and best_move == STILL:
        return Move(square, STILL)

    if best_move is STILL:
        smallestStrength = 100000
        for direction in DIRECTIONS:
            neighbor = game_map.get_target(square, direction)
            if neighbor.owner == myID \
                    and neighbor.strength < smallestStrength \
                    and (neighbor.strength > 0 or neighbor.production is 0):
                smallestStrength = neighbor.strength
                best_move = direction

    return Move(square, best_move)


def main():
    myID, game_map = get_init()
    send_init("Old one")

    while True:
        game_map.get_frame()
        moves = [make_move(square, game_map, myID) for square in game_map if square.owner == myID]
        hlt.send_frame(moves)

if __name__ == "__main__":
    main()