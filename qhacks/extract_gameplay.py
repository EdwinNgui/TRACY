import subprocess
import os

class CleanGameplay:

    def get_scene_changes(video_path):
        get_scene_changes = f"ffmpeg -i {video_path} -filter_complex \"select='gt(scene,0.15)',metadata=print:file=temp/time.txt\" -vsync vfr temp/img%03d.png"
        subprocess.run(get_scene_changes, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    def get_image_similarity(image1_path, image2_path):
        get_image_command = f"ffmpeg -i {image1_path} -i {image2_path} -filter_complex ssim -f null -"
        result = subprocess.run(get_image_command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        return float(result.stderr.split("All:")[1].split(" ")[0])

    def get_number_of_scene_changes():
        f = open("temp/time.txt", "r")
        return len(f.readlines())//2

    def get_timestamps_of_current_and_next_shot(i):
        f = open("temp/time.txt", "r")
        lines = f.readlines()
        current = (float(lines[(i-1)*2].split("pts_time:")[1]))
        next = (float(lines[i*2].split("pts_time:")[1])-0.1)
        return (current,next)

    def get_base_image(num_shots):
        for i in range(1,num_shots+1):
            for j in range(i+1,num_shots+1):
                if(get_image_similarity(f"temp/img{i:03}.png", f"temp/img{j:03}.png"))>0.6:
                    print(str(i) + " is the base image!!")
                    return i
                
    def get_all_base_image(i,num_shots):
        output = []
        for j in range(i+1,num_shots+1):
                if(get_image_similarity(f"temp/img{i:03}.png", f"temp/img{j:03}.png"))>0.6:
                    output.append(j)
        return output

    def ffmpeg_gaming(all_base):
        # Initialize an empty string to store the filter and audio filter parts
        vf_filter = ""
        af_filter = ""

        n=len(all_base)

        for i in range(n):
            timestamps = get_timestamps_of_current_and_next_shot(all_base[i])
            vf_filter += f"between(t,{timestamps[0]},{timestamps[1]})"
            af_filter += f"between(t,{timestamps[0]},{timestamps[1]})"

            if i < n - 1:
                vf_filter += "+"
                af_filter += "+"

        # Modify the ffmpeg command with the generated filter strings
        ffmpeg_command = f"""ffmpeg -y -i input.mp4 -vf "select='{vf_filter}', setpts=N/FRAME_RATE/TB" -af "aselect='{af_filter}', asetpts=N/SR/TB" out.mp4"""
        print("running ffmpeg!")
        subprocess.run(ffmpeg_command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    def process(infile):
        if os.path.exists("out.mp4"):
            os.remove("out.mp4")
        if not os.path.exists("temp"):
            os.makedirs("temp")

        get_scene_changes(infile)
        num_shots = get_number_of_scene_changes()
        base = get_base_image(num_shots)
        all_base = [base] + get_all_base_image(base,num_shots)
        ffmpeg_gaming(all_base)