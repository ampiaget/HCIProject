import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Add = () => {
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    difficulty: '',
    time: '',
    details: {
      ingredients: [],
      instructions: []
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddIngredient = () => {
    setNewRecipe(prevState => ({
      ...prevState,
      details: {
        ...prevState.details,
        ingredients: [...prevState.details.ingredients, '']
      }
    }));
  };

  const handleIngredientChange = (index, value) => {
    setNewRecipe(prevState => ({
      ...prevState,
      details: {
        ...prevState.details,
        ingredients: prevState.details.ingredients.map((ingredient, i) => i === index ? value : ingredient)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/recipes', newRecipe);
      console.log('Recipe added successfully:', response.data);
      // Clear the form after successfully adding the recipe
      setNewRecipe({
        title: '',
        difficulty: '',
        time: '',
        details: {
          ingredients: [],
          instructions: []
        }
      });
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={newRecipe.title} onChange={handleChange} />
      </label>
      <label>
        Difficulty:
        <input type="text" name="difficulty" value={newRecipe.difficulty} onChange={handleChange} />
      </label>
      <label>
        Time:
        <input type="text" name="time" value={newRecipe.time} onChange={handleChange} />
      </label>
      <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
      {newRecipe.details.ingredients.map((ingredient, index) => (
        <input key={index} type="text" value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)} />
      ))}
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default Add;
