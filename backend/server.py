from verification.verify import generate_recipe, verify_recipe
from flask import Flask, request, jsonify
from flask_cors import CORS
import redis
from flask_bcrypt import bcrypt
import json

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
            return jsonify({ 'message': 'Login Successful: ' + email, 'status': 200, 'email': email})
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
        print(r.hgetall("user:" + email))
        return jsonify({ 'message': 'User Added Successfully: ' + email, 'status': 200 })
       else:
        return jsonify({ 'message': 'Email already Exists: ' + email, 'status': 201 })
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/users', methods=['GET'])
def users():
   try:
        users = {}
        emails = r.smembers("user:emails")
        print(emails)
        for email in emails:
            user_data = r.hgetall("user:" + email)
            users[email] = user_data 
        return jsonify(users)   
   except Exception as e:
        return jsonify({'error': str(e)})
      
@app.route('/generate', methods=['POST'])
def generateRecipe():
   try:
   
    body = request.get_json()
    recipe_type = body.get('recipeType')
    ingredients = body.get('ingredients')
    cuisine_type = body.get('cuisineType')
    user_email = body.get('userEmail')
    
    recipe = generate_recipe(recipe_type, ingredients, cuisine_type)
    print(recipe)
    
    attempts = 0
    max_attempts = 2

    while attempts < max_attempts:
        recipe_verified = verify_recipe(recipe)
        attempts += 1
        if recipe_verified  == "True":
            formatted_recipe = json.loads(recipe)
            newRecipe = r.hset(
            "recipes:" + user_email,
            mapping = {
                "title": formatted_recipe["title"],
                "recipe_type": formatted_recipe["cuisine"], # changed to recipe type
                "ingredients": formatted_recipe["ingredients"],
                "instructions": formatted_recipe["instructions"],
                },
            )
            print(r.hgetall("recipes:" + user_email))
            return jsonify({ 'message': 'Success', 'status': 200, 'recipe': formatted_recipe, 'verify': recipe_verified})
        elif recipe == "UNSAFE":
            return jsonify({ 'message': 'You Entered an UNSAFE Substance - Please Try Again.', 'status': 201, 'verify': recipe_verified})
        else:
            recipe = generate_recipe(ingredients)
            continue
    if recipe_verified == "False":
        return jsonify({ 'message': 'Failed to generate recipe', 'status': 202, 'verify': recipe_verified})

   except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
