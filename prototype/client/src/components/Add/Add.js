import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './Add.css'

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

  const handleAddInstruction = () => {
    setNewRecipe(prevState => ({
      ...prevState,
      details: {
        ...prevState.details,
        instructions: [...prevState.details.instructions, '']
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

  const handleInstructionChange = (index, value) => {
    setNewRecipe(prevState => ({
      ...prevState,
      details: {
        ...prevState.details,
        instructions: prevState.details.instructions.map((instruction, i) => i === index ? value : instruction)
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
        about:'',
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
    <form onSubmit={handleSubmit} className='post-form'>
      <div className='post-row'>
        <div>
          <span>Recipe Name</span>
          <input type="text" name="title" value={newRecipe.title} onChange={handleChange} />
        </div>
        <div>
          <span>Difficulty</span>
          <select value={newRecipe.difficulty} onChange={handleChange} name="difficulty">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <span>/10</span>
        </div>
      </div>
      <div className='post-row'>
        <div>
          <span>Expected Time</span>
          <input type="number" name="time" value={newRecipe.time} onChange={handleChange} />
          <span>Minutes</span>
        </div>
        <div>
          <span>About</span>
          <input type="text" name="about" value={newRecipe.about} onChange={handleChange} />
        </div>
      </div>
      <div className='post-row'>
        <button type="button" onClick={handleAddIngredient}>Add ingredient</button>
        {newRecipe.details.ingredients.map((ingredient, index) => (
          <input key={index} type="text" value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)} />
        ))}
        <button type="button" onClick={handleAddInstruction}>Add direction</button>
        {newRecipe.details.instructions.map((instruction, index) => (
          <input key={index} type="text" value={instruction} onChange={(e) => handleInstructionChange(index, e.target.value)} />
        ))}
      </div>
      
      
      
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default Add;
