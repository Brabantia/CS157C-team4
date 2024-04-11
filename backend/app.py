from openai import OpenAI
import google.generativeai as genai
import os
import key 


def generate_recipe(preferences):
    # Initialize OpenAI client
    openai_key=key.openai_key
    client = OpenAI(api_key=openai_key)

    # Send request to OpenAI for recipe generation
    stream = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Generate an edible recipe based on these preferences: {preferences}. Also, make the prompt in JSON format with under 400 words that has 4 section: title (name of recipe), cuisine (veg /non-veg), ingredients (in one line only) and instruction (in paragraphs)",
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

    max_attempts = 5
    attempts = 0
    recipe_verified = None
    recipe = generate_recipe(preferences)
    print(f"Generated recipe: {recipe}")

    while attempts < max_attempts:
        recipe_verified = verify_recipe(recipe)
        #print(f"Verification result: {recipe_verified}")
        attempts += 1
        if recipe_verified  == "True":
            print("Recipe has been verified. It's a Safe.")
         #   print(recipe_verified)  # Print recipe_ver here # not working
            break  # Exit the loop if recipe is verified

        else:
            print(f"Attempt {attempts}: Recipe not verified, trying again...")
            continue

    if recipe_verified == "False":
        print("Failed to generate a verified recipe after maximum attempts.")







# Left: wiil add json, coonect with flask, with react, with redis, add routers.
