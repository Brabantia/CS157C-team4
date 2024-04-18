import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

// Cuisines cards
const Recipes = () => {
  const [cuisines, setCuisines] = useState([]);
 // let params = useParams();
 // need to replace these grey boxes with css rectangle element with text on them.

  useEffect(() => {
    const mockCuisines = [
      { id: 1, title: "Recipe 1", image: "https://via.placeholder.com/100" },
      { id: 2, title: "Recipe 2", image: "https://via.placeholder.com/100" },
      { id: 3, title: "Recipe 3", image: "https://via.placeholder.com/100" }
    ];
    setCuisines(mockCuisines);
  }, []);

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisines.map((recipe) => (
        <Card key={recipe.id}>
          <Link to={`/recipeDetails/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
};

export default Recipes;
