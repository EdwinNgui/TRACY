#DO NOT USE: Data sets might not identify the ball being out properly

import re
import matplotlib.pyplot as plt

def read_ball_data(file_path="./Data/ball1.txt"):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    ball_positions = []
    for line in lines:
        match = re.match(r'(\d+): (\d+), (\d+)', line)
        if match:
            frame, x, y = map(int, match.groups())
            ball_positions.append((x, y))

    return ball_positions

def is_ball_outside_court(ball_positions, court_ranges):
    court_x_min, court_x_max, court_y_min, court_y_max = court_ranges

    # Plot the court boundaries
    plt.plot([court_x_min, court_x_max, court_x_max, court_x_min, court_x_min],
             [court_y_min, court_y_min, court_y_max, court_y_max, court_y_min], color='black', linestyle='--')

    for x, y in ball_positions:
        if not (court_x_min <= x <= court_x_max and court_y_min <= y <= court_y_max):
            plt.scatter(x, y, color='red', marker='.')

    plt.title('Ball Positions Outside the Court Ranges')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.show()

# Court ranges to mark as "outside"
court_ranges = (286, 1379, 561, 2935)

# Read ball data
ball_data_path = r'./graph_functions/Data/ball1.txt'
ball_positions = read_ball_data(ball_data_path)

# Plot ball positions and mark only when the ball is outside the specified ranges
is_ball_outside_court(ball_positions, court_ranges)
