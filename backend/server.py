from flask import Flask, request, jsonify
from flask_cors import CORS
import redis
from flask_bcrypt import bcrypt

app = Flask(__name__)
CORS(app)

r = redis.Redis(host='localhost', port=6379, decode_responses=True)
print(r.ping()) # Checking if connection is working 

@app.route('/')
def backend():
    return 'Hello CS157C Project!'

@app.route('/login', methods=['POST'])
def login():
    try:
       body = request.get_json()
       email = body.get('email')
       password = body.get('password')
       if(r.sismember("user:emails", email) == 1):
        storedPassword = r.hget('user:' + email, "password")

        if (bcrypt.checkpw(password.encode('utf-8'), storedPassword.encode('utf-8'))):
            return jsonify({ 'message': 'Login Successful: ' + email, 'status': 200 })
        else:
            return jsonify({ 'message': 'Login Failed - Incorrect Password: ' + email, 'status': 202 })
       else:
        return jsonify({ 'message': 'Login Failed - No Email Exists: ' + email, 'status': 201 })

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/newUser', methods=['POST'])
def newUser():
    try:
       body = request.get_json()
       first_name = body.get('firstName')
       last_name = body.get('lastName')
       email = body.get('email')
       password = body.get('password')
       if(r.sismember("user:emails", email) == 0):
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        addEmail = r.sadd("user:emails", email)
        newUser = r.hset(
            "user:" + email,
            mapping = {
                "first_name": first_name,
                "last_name": last_name,
                "password": password_hash,
                },
            )
        print(r.hgetall( "user:" + email))
        return jsonify({ 'message': 'User Added Successfully: ' + email, 'status': 200 })
       else:
        return jsonify({ 'message': 'Email already Exists: ' + email, 'status': 201 })

    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=True)
