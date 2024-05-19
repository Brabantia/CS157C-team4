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
   
@app.route('/get_user', methods=['GET'])
def get_user():
    try:
        email = request.args.get('userEmail') 
        user_data = r.hgetall("user:" + email)
        return jsonify(user_data)   
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/update_password', methods=['POST'])
def update_password():
    try:
       body = request.get_json()
       email = body.get('email')
       password = body.get('password')
       new_password = body.get('new_password')
       if(r.sismember("user:emails", email) == 1):
        storedPassword = r.hget('user:' + email, "password")
        if (bcrypt.checkpw(password.encode('utf-8'), storedPassword.encode('utf-8'))):
            password_hash = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            if (password == new_password):
                return jsonify({'message': 'Same Password', 'status': 203})
            newUser = r.hset(
            "user:" + email,
            mapping = {
                "password": password_hash,
                },
            )
            print(r.hgetall("user:" + email))
            return jsonify({'message': 'Update Successful: ' + email, 'status': 200, 'email': email})
        else: 
            return jsonify({'message': 'Old Password Incorrect', 'status': 202})
       else:
        return jsonify({'message': 'Update Failed - No Account Exists: ' + email, 'status': 201})
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
    
    attempts = 0
    max_attempts = 2

    while attempts < max_attempts:
        recipe_verified = verify_recipe(recipe)
        attempts += 1
        if recipe_verified == "True":
            formatted_recipe = json.loads(recipe)

            if (r.hget("recipes:" + user_email, "count") == None):
                count = r.hset("recipes:" + user_email,
                    mapping = {
                        "count": 1
                    },
                )
            else:
               r.hincrby("recipes:" + user_email, "count", 1)
            
            recipeCount = r.hget("recipes:" + user_email, "count")
            print(recipeCount)
            newRecipe = r.hset(
            "recipes:" + user_email + ":" + recipeCount,
            mapping = {
                "title": formatted_recipe["title"],
                "recipe_type": formatted_recipe["cuisine"], # changed to recipe type
                "ingredients": formatted_recipe["ingredients"],
                "instructions": formatted_recipe["instructions"],
                },
            )
            print(r.hgetall("recipes:" + user_email + ":" + recipeCount))
            return jsonify({ 'message': 'Success', 'status': 200, 'recipe': formatted_recipe, 'recipeCount': recipeCount, 'verify': recipe_verified})
        elif recipe == "UNSAFE":
            return jsonify({ 'message': 'You Entered an UNSAFE Substance - Please Try Again.', 'status': 201, 'verify': recipe_verified})
        else:
            recipe = generate_recipe(ingredients)
            continue
    if recipe_verified == "False":
        return jsonify({ 'message': 'Failed to generate recipe', 'status': 202, 'verify': recipe_verified})

   except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/get_user_recipes', methods=['GET'])
def getUserRecipes():
    try:
        email = request.args.get('userEmail') 
        recipeCount = r.hget("recipes:" + email, "count")
        recipes = []
        print(email)
        for userR in range(int(recipeCount)):
            recipeInfo = r.hgetall("recipes:" + email + ":" + str(userR + 1))
            recipes.append(recipeInfo)
        #print(recipes)
        return jsonify({'recipes': recipes})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/delete_user_recipe', methods=['POST'])
def deleteUserRecipe():
    try:
        body = request.get_json()
        recipe_index = body.get('index')
        user_email = body.get('email')
        recipe_title = body.get('recipeTitle')
       
        recipeCount = r.hget("recipes:" + user_email, "count")
        recipeDeleteTitle = r.hget("recipes:" + user_email + ":" + str(recipe_index + 1), "title")
        
        changedKeys = False
        if (recipeDeleteTitle == recipe_title):
            r.delete("recipes:" + user_email + ":" + str(recipe_index + 1))
            r.hincrby("recipes:" + user_email, "count", -1)
            for userR in range((int(recipe_index) + 1), int(recipeCount)):
                recipeInfo = r.hgetall("recipes:" + user_email + ":" + str(userR + 1))
                recipeChange = r.hmset("recipes:" + user_email + ":" + str(userR), recipeInfo)
                changedKeys = True
            
            lastValue = int(recipeCount)
            print(lastValue)
            if (changedKeys):
                r.delete("recipes:" + user_email + ":" + str(lastValue))
            
            return jsonify({'status': 200, 'message': 'Deleted Recipe Successfully: ' + recipe_title,})
        else:
            return jsonify({'message': 'Error Deleting Recipe: ' + recipe_title,})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
