from openai import OpenAI
import os

# Initialize OpenAI client
client = OpenAI(api_key=os.environ.get("secret"))

def generate_recipe(preferences):
    # Send request to OpenAI for recipe generation
    stream = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Generate an unedible recipe based on these preferences: {preferences}.",
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
   # Send request to OpenAI for recipe generation
   stream = client.chat.completions.create(
       messages=[
           {
               "role": "user",
                              "content": f"I have this recipe: {recipe}. Is it edible? Reply True or False.",
           }
       ],
       model="gpt-3.5-turbo",
       stream=True,
   )

   # Iterate through stream and concatenate response chunks
   recipe_ver = ""
   for chunk in stream:
       recipe_ver += chunk.choices[0].delta.content or ""

   # Return generated recipe
   return recipe_ver.strip()

if __name__ == "__main__":
    preferences = input("Enter your preferences: ")

    max_attempts = 1
    attempts = 0
    recipe_verified = False

    while attempts < max_attempts and not recipe_verified:
        recipe = generate_recipe(preferences)
        print(f"Generated recipe: {recipe}")
        recipe_verified = verify_recipe(recipe)
        print(f"Verification result: {recipe_verified}")
        attempts += 1
        if recipe_verified:
            print("Recipe verified:")
            print(recipe_verified)  # Print recipe_ver here
        else:
            print(f"Attempt {attempts}: Recipe not verified, trying again...")

    if not recipe_verified:
        print("Failed to generate a verified recipe after maximum attempts.")
