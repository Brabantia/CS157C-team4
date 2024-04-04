from flask import Flask
from flask_cors import CORS
import redis

app = Flask(__name__)
CORS(app)

r = redis.Redis(host='localhost', port=6379, decode_responses=True)
print(r.ping()) # Checking if connection is working 

@app.route('/')
def backend():
    return 'Hello CS157C Project!'
    
if __name__ == '__main__':
    app.run(debug=True)
