import colorsys
import pygame


def start_frames_animation(replay):
    cell_size = 20

    white = (255, 255, 255)

    pygame.init()
    size = [replay.width * cell_size + 1, replay.height * cell_size + 1]
    screen = pygame.display.set_mode(size)

    # Loop until the user clicks the close button.
    done = False
    clock = pygame.time.Clock()

    while not done:
        for frame_index in range(replay.num_frames):
            clock.tick(10)

            for event in pygame.event.get():  # User did something
                if event.type == pygame.QUIT:  # If user clicked close
                    done = True  # Flag that we are done so we exit this loop

            screen.fill(white)

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
            v = 1 - production / replay.max_production
            s = 0
            production_fill_color = colorsys.hsv_to_rgb(0, s, v)

            # outline_color = "#aaa"
            if owner_type == 0:  # my
                owner_color = pygame.Color("#c4003e")
                outline_color = owner_color
                # fill_color = "#%s0000" % hex(255-int(strength))[2:].zfill(2)
                # outline_color = "#ff0000"
            elif owner_type == 100:  # map
                owner_color = pygame.Color("#363636")
                outline_color = production_fill_color

                # fill_color = "#%s" % (hex(255-int(strength))[2:].zfill(2)*3)
                # outline_color = "#aaaaaa"
            elif owner_type == 200:  # enemy
                owner_color = pygame.Color("#4580ff")
                outline_color = owner_color
                # fill_color = "#0000%s" % hex(255-int(strength))[2:].zfill(2)
                # outline_color = "#0000ff"

            # L 0.17 (more) - .55 (less)
            # S .45 (less) - 1 (more)
            pygame.draw.rect(screen, production_fill_color, [
                y * cell_size, x * cell_size,
                y * cell_size + cell_size - 1, x * cell_size + cell_size - 1])

            inner_rect_size = strength / 255 * cell_size
            padding = (cell_size - inner_rect_size) / 2
            pygame.draw.rect(screen, owner_color, [
                y * cell_size + padding, x * cell_size + padding,
                y * cell_size + cell_size - padding, x * cell_size + cell_size - padding
            ])