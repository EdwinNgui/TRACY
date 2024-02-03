import openai
from dotenv import load_dotenv
import os
import json

def sendGPTResponse(message):
    load_dotenv()
    client = openai.ChatCompletion.create(api_key=os.getenv('OPENAI_API_KEY'), organization="org-fLqejsu1pDKBae0DMhNvznX0", model="gpt-3.5-turbo", messages=[
            {"role": "system", "content": "You are a tennis analyst that is acting as a coach. You will provide insights and constructive advice to tennis players based on various statistics and trends given to you based on data extracted from their game footage. Do not ramble on one piece of advice for too long and aim to provide an effective summary."},
            {"role": "user", "content": message}
        ])
    return client['choices'][0]['message']['content']

def gptPromptCreation(player_data):
    return f"My serve is on average {player_data['serve_speed']} km/h and fairly slow. Give me tips on how to improve my serve speed."

def submitReview(player_data):
    gpt_output = sendGPTResponse(message=gptPromptCreation(player_data))
    print(gpt_output)

    # post request to JavaScript
    data = {'message': gpt_output}
    with open('gpt_data.json', 'w') as file:
        json.dump(data, file)

# Example usage with specific player data
player_data = {
    "serve_speed": 60  # replace with the actual serve speed of the player
}

submitReview(player_data)
