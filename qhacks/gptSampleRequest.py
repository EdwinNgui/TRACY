import requests

def get_text_from_server(player_data):
    try:
        response = requests.post('http://127.0.0.1:5000/get_text', json=player_data)
        text = response.json().get('message')
        print(text)
        payload = {'message': text}
        try:
            response = requests.get('http://127.0.0.1:3000/post_text', json=payload)
            print(response.json())
        except requests.exceptions.RequestException as e:
            print('Error:', e)
    except requests.exceptions.RequestException as e:
        print('Error:', e)

if __name__ == "__main__":
    player_data = {
        "serve_speed": 60  # replace with the actual data from the player
    }
    get_text_from_server(player_data)