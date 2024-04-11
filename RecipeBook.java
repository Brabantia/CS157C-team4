import redis.clients.jedis.Jedis;

public class RecipeBook {
    public static void main(String[] args) {
    	Jedis cookBook = new Jedis("http://localhost:6379");
    	System.out.println("Connected to server successfully");

    }
    /*
     * @param cookBook that stores recipes
     * @param username of person entering new recipe
     * @param cuisine of the recipe being stored
     * @param title of the new recipe
     * @param ingredients needed to prepare recipe
     * @param instructions how to prepare recipe
     */
    private static void storeRecipe(Jedis cookBook, String username, String cuisine, String title, String ingredients, String instructions) {
    
    }
    /*
     * @param cookBook to retrieve recipe from
     * @param username of maker of recipe
     * @param cuisine to which recipe belongs
     * @return array with {dish title, ingredients, preparation steps, cuisine}
     */
    private static String[] getRecipe(Jedis cookBook, String username, String cuisine) {
    	String[] recipe = new String[] {username, cuisine};
    	return recipe;
    }
}