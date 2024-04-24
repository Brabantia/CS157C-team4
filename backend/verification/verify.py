from openai import OpenAI
import google.generativeai as genai
import os
import verification.key as key 
# import key as key 



def generate_recipe(preferences):
    # Initialize OpenAI client
    openai_key=key.openai_key
    client = OpenAI(api_key=openai_key)

    # Send request to OpenAI for recipe generation
    stream = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Generate a recipe based on these preferences: {preferences}. If any unsafe substance like metal or aluminium or something similar is included, reply with UNSAFE in one word, else: Provide the recipe in JSON format with under 400 words, including 4 sections: title (recipe name), cuisine (veg / non-veg), ingredients (one-line list), and instructions (paragraphs).",
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


if __name__ == "__main__":
    preferences = input("Enter your preferences: ")

    max_attempts = 2
    attempts = 0
    # recipe_verified = None
    recipe = generate_recipe(preferences)
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
            recipe = generate_recipe(preferences)
            continue

    if recipe_verified == "False":
        print("Failed to generate a verified recipe after maximum attempts.")