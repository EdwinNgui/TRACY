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

    return np.array(ball_positions)

def detect_bounces(ball_positions):
    # Calculate the differences in y-coordinate
    dy = np.diff(ball_positions[:, 1])

    # Detect bounces based on sign change in y-coordinate difference
    bounce_indices = np.where(np.diff(np.sign(dy)) != 0)[0] + 1  # Adding 1 to align with original indices

    return bounce_indices

def plot_ball_trajectory(ball_positions, bounce_indices, aspect_ratio=1.0):
    plt.figure(figsize=(aspect_ratio * 6, 6))  # Adjust the figure size based on the aspect ratio
    plt.plot(ball_positions[:, 0], ball_positions[:, 1], label='Ball Trajectory')
    plt.scatter(ball_positions[bounce_indices, 0], ball_positions[bounce_indices, 1], c='red', label='Bounce Points')
    plt.title('Ball Trajectory with Bounce Points')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.legend()
    plt.gca().set_aspect(aspect_ratio, adjustable='box')  # Adjust aspect ratio for the plot
    plt.show()

# Read ball data
ball_data_path = r'./graph_functions/Data/ball1.txt'
ball_positions = read_ball_data(ball_data_path)

# Detect bounces
bounce_indices = detect_bounces(ball_positions)

# Plot ball trajectory with bounce points and aspect ratio of 2.0
plot_ball_trajectory(ball_positions, bounce_indices, aspect_ratio=0.6)

# Display the frame indices where bounces occurred
print("Bounce Frame Indices:", bounce_indices)
