import re
import numpy as np
import math
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

    # Detect bounces based on the sign change in y-coordinate difference
    bounce_indices = np.where(np.diff(np.sign(dy)) != 0)[0] + 1  # Adding 1 to align with original indices

    return bounce_indices

def plot_ball_trajectory(ball_positions, bounce_indices, serve_indices, speed_indices, aspect_ratio=1.0, flip_y=False):
    plt.figure(figsize=(aspect_ratio * 6, 6))  # Adjust the figure size based on the aspect ratio

    court_coordinates_singles = np.array([[286, 561], [1379, 561], [1379, 2935], [286, 2935], [286, 561]])
    plt.plot(court_coordinates_singles[:, 0], court_coordinates_singles[:, 1])

    net = np.array([[186, 1748], [1479, 1748]])
    plt.plot(net[:, 0], net[:, 1])

    plt.plot(ball_positions[:, 0], ball_positions[:, 1], label='Ball Trajectory')

    plt.scatter(ball_positions[speed_indices, 0], ball_positions[speed_indices, 1], c='green', label='Speed Points')
    plt.scatter(ball_positions[bounce_indices, 0], ball_positions[bounce_indices, 1], c='red', label='Bounce Points')
    plt.scatter(ball_positions[serve_indices, 0], ball_positions[serve_indices, 1], c='purple', label='Serve Points')

    plt.title('Ball Trajectory with Bounce and Serve Points')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.legend()
    plt.gca().set_aspect(aspect_ratio, adjustable='box')  # Adjust aspect ratio for the plot

    if flip_y:
        plt.gca().invert_yaxis()  # Flip the x-axis

    plt.xlim(0, 1665)
    plt.ylim(0, 3496)

    plt.show()

# def plot_bounce_grid(ball_positions, bounce_indices):
#     if len(bounce_indices) == 0:
#         print("No bounces detected.")
#         return

#     # Divide the y-axis into two halves
#     mid_y = (np.min(ball_positions[:, 1]) + np.max(ball_positions[:, 1])) / 2
#     top_half = ball_positions[ball_positions[:, 1] > mid_y]
#     bottom_half = ball_positions[ball_positions[:, 1] <= mid_y]

#     # Check if bounce_indices are within bounds
#     if max(bounce_indices) >= len(top_half) or max(bounce_indices) >= len(bottom_half):
#         print("Bounce indices are out of bounds.")
#         return

#     # Create a 3x3 grid for both halves
#     grid_spec_top = GridSpec(2, 3, height_ratios=[1, 1])
#     grid_spec_bottom = GridSpec(2, 3, height_ratios=[1, 1])

#     # Plot top half grid
#     plt.figure(figsize=(12, 8))
#     plt.subplot(grid_spec_top[0, :])
#     plt.plot(top_half[:, 0], top_half[:, 1], label='Top Half')
#     plt.scatter(top_half[bounce_indices, 0], top_half[bounce_indices, 1], c='red', label='Bounce Points')

#     # Draw the 3x3 grid boundaries on top
#     for i in range(1, 3):
#         plt.axvline(np.percentile(top_half[:, 0], i * 33.33), color='black', linestyle='--', linewidth=1)
#     for i in range(1, 2):
#         plt.axhline(np.percentile(top_half[:, 1], i * 50), color='black', linestyle='--', linewidth=1)

#     plt.title('Top Half of Ball Trajectory with Bounce Points')
#     plt.xlabel('X-axis')
#     plt.ylabel('Y-axis')
#     plt.legend()

#     # Plot the 3x3 grid for the top half with percentages
#     for i in range(3):
#         for j in range(3):
#             plt.subplot(grid_spec_top[1, i * 3 + j])
#             x_range = np.linspace(np.percentile(top_half[:, 0], i * 33.33), np.percentile(top_half[:, 0], (i + 1) * 33.33), 4)
#             y_range = np.linspace(np.percentile(top_half[:, 1], j * 50), np.percentile(top_half[:, 1], (j + 1) * 50), 4)
#             plt.hist2d(top_half[:, 0], top_half[:, 1], bins=[x_range, y_range], cmin=1, cmap='Reds', cmax=len(top_half) // 9)
#             plt.title(f'Grid Section {i * 3 + j + 1}')
#             plt.colorbar(label='Bounce Count')
#             plt.text(np.mean(x_range[:-1]), np.mean(y_range[:-1]), f'{(i * 3 + j + 1) * 10}%', color='black', ha='center', va='center', fontsize=10)

#     plt.tight_layout()
#     plt.show()

#     # Plot bottom half grid
#     plt.figure(figsize=(12, 8))
#     plt.subplot(grid_spec_bottom[1, :])
#     plt.plot(bottom_half[:, 0], bottom_half[:, 1], label='Bottom Half')
#     plt.scatter(bottom_half[bounce_indices, 0], bottom_half[bounce_indices, 1], c='red', label='Bounce Points')

#     # Draw the 3x3 grid boundaries on top
#     for i in range(1, 3):
#         plt.axvline(np.percentile(bottom_half[:, 0], i * 33.33), color='black', linestyle='--', linewidth=1)
#     for i in range(1, 2):
#         plt.axhline(np.percentile(bottom_half[:, 1], i * 50), color='black', linestyle='--', linewidth=1)

#     plt.title('Bottom Half of Ball Trajectory with Bounce Points')
#     plt.xlabel('X-axis')
#     plt.ylabel('Y-axis')
#     plt.legend()

#     # Plot the 3x3 grid for the bottom half with percentages
#     for i in range(3):
#         for j in range(3):
#             plt.subplot(grid_spec_bottom[0, i * 3 + j])
#             x_range = np.linspace(np.percentile(bottom_half[:, 0], i * 33.33), np.percentile(bottom_half[:, 0], (i + 1) * 33.33), 4)
#             y_range = np.linspace(np.percentile(bottom_half[:, 1], j * 50), np.percentile(bottom_half[:, 1], (j + 1) * 50), 4)
#             plt.hist2d(bottom_half[:, 0], bottom_half[:, 1], bins=[x_range, y_range], cmin=1, cmap='Reds', cmax=len(bottom_half) // 9)
#             plt.title(f'Grid Section {i * 3 + j + 1}')
#             plt.colorbar(label='Bounce Count')
#             plt.text(np.mean(x_range[:-1]), np.mean(y_range[:-1]), f'{(i * 3 + j + 1) * 10}%', color='black', ha='center', va='center', fontsize=10)

#     plt.tight_layout()
#     plt.show()

def get_serve_indices(ball_positions, bounce_indices):
    if len(bounce_indices) == 0:
        print("No bounces detected.")
        return
    middle_line = 1748 
    for index in range(1, len(bounce_indices)):
        start = bounce_indices[index-1]
        end = bounce_indices[index]
        if (ball_positions[start][1] < middle_line and ball_positions[end][1] > middle_line) or (ball_positions[start][1] > middle_line and ball_positions[end][1] < middle_line):
            return (start, end)
    return None

def get_serve_speed(ball_positions, serve_indices):
    middle_line = 1748 
    for index in range(serve_indices[0]+1, serve_indices[1]):
        start = index-1
        end = index
        if (ball_positions[start][1] < middle_line and ball_positions[end][1] > middle_line) or (ball_positions[start][1] > middle_line and ball_positions[end][1] < middle_line):
            pixel_dist = math.dist(ball_positions[start], ball_positions[end])
            metre_dist = (pixel_dist * 23.77) / 2374.0
            kmh = (metre_dist / (1/30)) * 8
            return kmh, (start, end)


# Read ball data
ball_data_path = r'./graph_functions/Data/ball1.txt'
ball_positions = read_ball_data(ball_data_path)

# Detect bounces
bounce_indices = detect_bounces(ball_positions)

serve_indices = get_serve_indices(ball_positions, bounce_indices)
serve_speed, speed_indices = get_serve_speed(ball_positions, serve_indices)

# Plot ball trajectory with bounce points and aspect ratio of 2.0
plot_ball_trajectory(ball_positions, bounce_indices, serve_indices, speed_indices, aspect_ratio=0.6, flip_y=True)

# # Plot the bounce grid ratios
# plot_bounce_grid(ball_positions, bounce_indices)

# # Display the frame indices where bounces occurred
# print("Bounce Frame Indices:")
# for index in bounce_indices:
#     print(ball_positions[index])

# Display the frame indices where bounces occurred
print("Serve Frame Indices:", serve_indices)
print("Serve Speed:", serve_speed)