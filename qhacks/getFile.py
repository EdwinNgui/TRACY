from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json
import cv2
import time

class RequestHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')  # Allow requests from any origin
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        # Save the file to a temporary location
        with open('./tmp/uploaded_file', 'wb') as file:
            file.write(post_data)
            file.close()

        time.sleep(10)
        # Process the file (replace this with your actual processing logic)
        result = self.process_function('./tmp/uploaded_file')

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        response_data = {'result': result}
        self.wfile.write(json.dumps(response_data).encode())

    def process_function(self, file_path):
        cap = cv2.VideoCapture(file_path)
        height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
        width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)

        return str(height) + " x " + str(width)

def run_server(port=3001):
    server_address = ('', port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Starting server on port {port}')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
