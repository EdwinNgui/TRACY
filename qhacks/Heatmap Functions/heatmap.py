import re
import numpy as np
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

def read_player_data(file_path="./Data/player1.txt"):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    player_positions_1 = []
    player_positions_2 = []

    for line in lines:
        match = re.match(r'Iteration \d+: Player 1: x = (\d+\.\d+), y = (\d+\.\d+)', line)
        if match:
            x, y = map(float, match.groups())
            player_positions_1.append((x, y))

        match = re.match(r'Iteration \d+: Player 2: x = (\d+\.\d+), y = (\d+\.\d+)', line)
        if match:
            x, y = map(float, match.groups())
            player_positions_2.append((x, y))

    return player_positions_1, player_positions_2

def create_heatmap(data, title, xlabel, ylabel, orientation='vertical', rotate_degrees=0, aspect_ratio=1.0, vmax=None):
    x, y = zip(*data)
    heatmap, xedges, yedges = np.histogram2d(x, y, bins=(50, 50))
    heatmap_rotated = np.rot90(heatmap, k=int(rotate_degrees / 90))

    # Clip values above 10 to 10
    heatmap_clipped = np.clip(heatmap_rotated, None, 10)

    extent = [xedges[0], xedges[-1], yedges[0], yedges[-1]]

    plt.clf()
    if orientation == 'horizontal':
        plt.imshow(heatmap_clipped, extent=extent, origin='lower', cmap='viridis', interpolation='nearest', aspect=aspect_ratio, vmax=vmax)
        plt.colorbar(label='Density')
        plt.title(title)
        plt.xlabel(ylabel)  # Switch xlabel and ylabel for horizontal orientation
        plt.ylabel(xlabel)
    else:
        plt.imshow(heatmap_clipped.T, extent=extent, origin='lower', cmap='viridis', interpolation='nearest', aspect=aspect_ratio, vmax=vmax)
        plt.colorbar(label='Density')
        plt.title(title)
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
    plt.show()

# Read ball data
ball_data_path = r'C:\Users\edwin\Documents\GitHub\QHacks2024\qhacks\Heatmap Functions\Data\ball1.txt'
ball_positions = read_ball_data(ball_data_path)

# Read player data
player_data_path = r'C:\Users\edwin\Documents\GitHub\QHacks2024\qhacks\Heatmap Functions\Data\player1.txt'
player_positions_1, player_positions_2 = read_player_data(player_data_path)

# Create and display stretched ball heatmap with vmax=20 and aspect_ratio=2.0 for horizontal stretch
create_heatmap(ball_positions, 'Ball Heat Map', 'X-axis', 'Y-axis', vmax=20, aspect_ratio=0.6)

# Create and display heatmaps with horizontal orientation for player positions
create_heatmap(player_positions_1, 'Player 1 Heat Map', 'Y-axis', 'X-axis', orientation='horizontal', rotate_degrees=90, aspect_ratio=0.2, vmax=10)
create_heatmap(player_positions_2, 'Player 2 Heat Map', 'Y-axis', 'X-axis', orientation='horizontal')
