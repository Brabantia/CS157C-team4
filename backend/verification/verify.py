import sys #added for script
from openai import OpenAI
import google.generativeai as genai
import os
import verification.key as key 
#import key as key 



def generate_recipe(recipe_type, ingredients, cuisine_type):
    # Initialize OpenAI client
    openai_key=key.openai_key
    client = OpenAI(api_key=openai_key)

    # Send request to OpenAI for recipe generation
    stream = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Generate a recipe based on the following parameters: Recipe type: {recipe_type}, ingredients: {ingredients}, and cuisine type: {cuisine_type}. If the input includes any unsafe substances such as metal or aluminum, or conflicting ingredients like 'veg and chicken', respond with 'UNSAFE'. Otherwise, provide the recipe in JSON format, limited to 400 words. The recipe should include four sections: title (recipe name), cuisine (categorized as veg or non-veg), ingredients (formatted as a one-line list), and instructions (written in paragraphs).",
            }
        ],
        model="gpt-3.5-turbo",
        stream=True,
    )

    # Iterate through stream and concatenate response chunks
    recipe = ""
    for chunk in stream:
        recipe += chunk.choices[0].delta.content or ""

    # Return generated recipe
    return recipe.strip()



def verify_recipe(recipe):

  genai.configure(api_key=key.gemini_key)

  # Set up the model
  generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
  }

 

  model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                generation_config=generation_config)

  convo = model.start_chat()
  verify = "This is a recipe that i made out of thin air:" + recipe +  "Reply in one word, Is it edible, True or False?"
  convo.send_message(verify)

  return convo.last.text

def unedible_generate_recipe(recipe_type, ingredients, cuisine_type):
    # Initialize OpenAI client
    openai_key=key.openai_key
    client = OpenAI(api_key=openai_key)

    # Send request to OpenAI for recipe generation
    stream = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Generate UNEDIBLE recipe based on Recipe type: {recipe_type} , ingredients: {ingredients} , cuisine type: {cuisine_type} , Provide the recipe in JSON format with under 400 words, including 4 sections: title (recipe name), cuisine (veg / non-veg), ingredients (one-line list), and instructions (paragraphs).",
            }
        ],
        model="gpt-3.5-turbo",
        stream=True,
    )

    # Iterate through stream and concatenate response chunks
    recipe = ""
    for chunk in stream:
        recipe += chunk.choices[0].delta.content or ""

    # Return generated recipe
    return recipe.strip()


if __name__ == "__main__":

    recipe_type = input("Enter Recipe Type (vegetarian/non-vegetarian): ")
    ingredients = input("Enter Ingredients (comma-separated): ")
    cuisine_type = input("Enter Cuisine Type (e.g., Italian, Chinese): ")



    # Will trigger unedible testing funation only when we at specific URL
    if len(sys.argv) > 1 and sys.argv[1] == "/unedible_URL":
        recipe_function = unedible_generate_recipe
    else:
        recipe_function = generate_recipe




    max_attempts = 2
    attempts = 0
    # recipe_verified = None
    recipe = recipe_function(recipe_type, ingredients, cuisine_type)
    while attempts < max_attempts:
        print(f"Generated recipe: {recipe}")
        recipe_verified = verify_recipe(recipe)
        print(f"Verification result: {recipe_verified}")
        attempts += 1
        if recipe_verified  == "True":
            print("Recipe has been verified. It's a Safe.")
            print(recipe_verified)  # Print recipe_ver here # not working
            break  # Exit the loop if recipe is verified
        elif recipe == "UNSAFE":
            print("You have entered unsafe substance in your form. Please try again.")

        else:
            print(f"Attempt {attempts}: Recipe not verified, trying again...")
            recipe = generate_recipe(recipe_type, ingredients, cuisine_type)
            continue

    if recipe_verified == "False":
        print("Failed to generate a verified recipe after maximum attempts.")