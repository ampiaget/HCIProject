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
        <div className='row-one-left'>
          <span className='add-recipe-name'>Recipe Name</span>
          <input className='post-form-name-input' type="text" name="title" value={newRecipe.title} onChange={handleChange} placeholder='enter recipe name'/>
        </div>
        <div className='row-one-right'>
          <span className='post-form-section-title'>Difficulty</span>
          <select className='post-form-difficulty-dropdown' value={newRecipe.difficulty} onChange={handleChange} name="difficulty" placeholder='0'>
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
          <span className='post-form-section-title'>/10</span>
        </div>
      </div>
      <div className='post-row'>
        <div>
          <span className='post-form-section-title'>Expected Time</span>
          <input className='post-form-number-input' type="number" name="time" value={newRecipe.time} onChange={handleChange} placeholder='00'/>
          <span className='post-form-small-text'>Minutes</span>
        </div>
        <div>
          <span className='post-form-section-title'>About</span>
          <input className='post-form-about-input' type="text" name="about" value={newRecipe.about} onChange={handleChange} />
        </div>
      </div>
      <div className='post-row'>
        <div>
          <span className='post-form-section-underlined'>Ingredients</span>
          <button type="button" onClick={handleAddIngredient}>Add ingredient</button>
          {newRecipe.details.ingredients.map((ingredient, index) => (
            <input key={index} type="text" value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)} />
          ))}
        </div>
        <div>
          <span className='post-form-section-underlined'>Directions</span>
          <button type="button" onClick={handleAddInstruction}>Add direction</button>
          {newRecipe.details.instructions.map((instruction, index) => (
            <input key={index} type="text" value={instruction} onChange={(e) => handleInstructionChange(index, e.target.value)} />
          ))}
        </div>
        
        
      </div>
      
      
      
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default Add;
