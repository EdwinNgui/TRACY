import openai
from dotenv import load_dotenv
import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def sendGPTResponse(message):
    load_dotenv()
    client = openai.ChatCompletion.create(api_key=os.getenv('OPENAI_API_KEY'), organization="org-fLqejsu1pDKBae0DMhNvznX0", model="gpt-3.5-turbo", messages=[
            {"role": "system", "content": "You are a tennis analyst that is acting as a coach. You will provide insights and constructive advice to tennis players based on various statistics and trends given to you based on data extracted from their game footage. Please aim to provide an effective summary of your statements and advice. First repeat the problems that I'm facing or the trends seen in the data, then provide a your coaching and analysis after."},
            {"role": "user", "content": message}
        ])
    return client['choices'][0]['message']['content']

def gptPromptCreation(player_data):
    return f"My serve is on average {player_data['serve_speed']} km/h and fairly slow. Give me tips on how to improve my serve speed."

@app.route('/get_text', methods=['GET'])
def get_text():
    try:
        player_data = request.json  # Extract JSON data from the request
        gpt_output = sendGPTResponse(message=gptPromptCreation(player_data))
        data = {'message': gpt_output}
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
    # gpt_output = sendGPTResponse(message=gptPromptCreation(player_data))
    # print(gpt_output)

    # # post request to JavaScript
    # data = {'message': gpt_output}
    # with open('gpt_data.json', 'w') as file:
    #     json.dump(data, file)

# Example usage with specific player data
# player_data = {
#     "serve_speed": 60  # replace with the actual serve speed of the player
# }

if __name__ == '__main__':
    app.run(debug=True)