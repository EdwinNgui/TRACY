import re
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.gridspec import GridSpec

def read_ball_data(file_path="./Data/ball1.txt"):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    ball_positions = []
    for line in lines:
        match = re.match(r'(\d+): (\d+), (\d+)', line)
        if match:
            frame, x, y = map(int, match.groups())
            ball_positions.append((x, y))

    return np.array(ball_positions)

def detect_bounces(ball_positions):
    # Calculate the differences in y-coordinate
    dy = np.diff(ball_positions[:, 1])

    # Detect bounces based on sign change in y-coordinate difference
    bounce_indices = np.where(np.diff(np.sign(dy)) != 0)[0] + 1  # Adding 1 to align with original indices

    return bounce_indices

def plot_ball_trajectory(ball_positions, bounce_indices, aspect_ratio=1.0, flip_y=False):
    plt.figure(figsize=(aspect_ratio * 6, 6))  # Adjust the figure size based on the aspect ratio
    plt.plot(ball_positions[:, 0], ball_positions[:, 1], label='Ball Trajectory')
    plt.scatter(ball_positions[bounce_indices, 0], ball_positions[bounce_indices, 1], c='red', label='Bounce Points')
    plt.title('Ball Trajectory with Bounce Points')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.legend()
    plt.gca().set_aspect(aspect_ratio, adjustable='box')  # Adjust aspect ratio for the plot

    if flip_y:
        plt.gca().invert_yaxis()  # Flip the x-axis

    plt.show()

def plot_bounce_grid(ball_positions, bounce_indices):
    if len(bounce_indices) == 0:
        print("No bounces detected.")
        return

    # Divide the y-axis into two halves
    mid_y = (np.min(ball_positions[:, 1]) + np.max(ball_positions[:, 1])) / 2
    top_half = ball_positions[ball_positions[:, 1] > mid_y]
    bottom_half = ball_positions[ball_positions[:, 1] <= mid_y]

    # Check if there are enough bounces to create the grid
    if len(bounce_indices) < 9:
        print("Not enough bounces to create the grid.")
        return

    # Check if bounce_indices are within bounds
    if max(bounce_indices) >= len(top_half) or max(bounce_indices) >= len(bottom_half):
        print("Bounce indices are out of bounds.")
        return

    # Create a 3x3 grid for both halves
    grid_spec_top = GridSpec(2, 3, height_ratios=[1, 1])
    grid_spec_bottom = GridSpec(2, 3, height_ratios=[1, 1])

    # Plot top half grid
    plt.figure(figsize=(12, 8))
    plt.subplot(grid_spec_top[0, :])
    plt.plot(top_half[:, 0], top_half[:, 1], label='Top Half')
    plt.scatter(top_half[bounce_indices, 0], top_half[bounce_indices, 1], c='red', label='Bounce Points')

    # Draw the 3x3 grid boundaries on top
    for i in range(1, 3):
        plt.axvline(np.percentile(top_half[:, 0], i * 33.33), color='black', linestyle='--', linewidth=1)
    for i in range(1, 2):
        plt.axhline(np.percentile(top_half[:, 1], i * 50), color='black', linestyle='--', linewidth=1)

    plt.title('Top Half of Ball Trajectory with Bounce Points')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.legend()

    # Plot the 3x3 grid for top half with percentages
    for i in range(3):
        for j in range(3):
            plt.subplot(grid_spec_top[1, i * 3 + j])
            x_range = np.linspace(np.min(top_half[:, 0]), np.max(top_half[:, 0]), 4)
            y_range = np.linspace(np.min(top_half[:, 1]), np.max(top_half[:, 1]), 4)
            plt.hist2d(top_half[:, 0], top_half[:, 1], bins=[x_range, y_range], cmin=1, cmap='Reds', cmax=len(top_half) // 9)
            plt.title(f'Grid Section {i * 3 + j + 1}')
            plt.colorbar(label='Bounce Count')
            plt.text(np.mean(x_range[:-1]), np.mean(y_range[:-1]), f'{(i * 3 + j + 1) * 10}%', color='black', ha='center', va='center', fontsize=10)

    plt.tight_layout()
    plt.show()

    # Plot bottom half grid
    plt.figure(figsize=(12, 8))
    plt.subplot(grid_spec_bottom[1, :])
    plt.plot(bottom_half[:, 0], bottom_half[:, 1], label='Bottom Half')
    plt.scatter(bottom_half[bounce_indices, 0], bottom_half[bounce_indices, 1], c='red', label='Bounce Points')

    # Draw the 3x3 grid boundaries on top
    for i in range(1, 3):
        plt.axvline(np.percentile(bottom_half[:, 0], i * 33.33), color='black', linestyle='--', linewidth=1)
    for i in range(1, 2):
        plt.axhline(np.percentile(bottom_half[:, 1], i * 50), color='black', linestyle='--', linewidth=1)

    plt.title('Bottom Half of Ball Trajectory with Bounce Points')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.legend()

    # Plot the 3x3 grid for bottom half with percentages
    for i in range(3):
        for j in range(3):
            plt.subplot(grid_spec_bottom[0, i * 3 + j])
            x_range = np.linspace(np.min(bottom_half[:, 0]), np.max(bottom_half[:, 0]), 4)
            y_range = np.linspace(np.min(bottom_half[:, 1]), np.max(bottom_half[:, 1]), 4)
            plt.hist2d(bottom_half[:, 0], bottom_half[:, 1], bins=[x_range, y_range], cmin=1, cmap='Reds', cmax=len(bottom_half) // 9)
            plt.title(f'Grid Section {i * 3 + j + 1}')
            plt.colorbar(label='Bounce Count')
            plt.text(np.mean(x_range[:-1]), np.mean(y_range[:-1]), f'{(i * 3 + j + 1) * 10}%', color='black', ha='center', va='center', fontsize=10)

    plt.tight_layout()
    plt.show()

# Read ball data
ball_data_path = r'./graph_functions/Data/ball1.txt'
ball_positions = read_ball_data(ball_data_path)

# Detect bounces
bounce_indices = detect_bounces(ball_positions)

# Plot ball trajectory with bounce points and aspect ratio of 2.0
plot_ball_trajectory(ball_positions, bounce_indices, aspect_ratio=0.6, flip_y=True)

# Plot the bounce grid ratios
plot_bounce_grid(ball_positions, bounce_indices)

# Display the frame indices where bounces occurred
print("Bounce Frame Indices:", bounce_indices)
