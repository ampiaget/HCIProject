import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import IngredientCard from '../IngredientCard/IngredientCard';
import './Add.css'

const Add = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState();

  function handleFileChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }

  const [newRecipe, setNewRecipe] = useState({
    title: '',
    difficulty: '',
    time: '',
    details: {
      ingredients: [{ "name": '', "amount": '', "type": '' }],
      instructions: [""]
    }
  });

  const [addedIngredients, setAddedIngredients] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [showIngredientForm, setShowIngredientForm] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // handling adding ingredients and alternative ingredients
  const handleAddIngredient = () => {
    const ingredients = newRecipe.details.ingredients;
    
    // Check if the last ingredient is empty
    const lastIngredient = ingredients[ingredients.length - 1];
    if (!lastIngredient || (lastIngredient.name.trim() !== '' && lastIngredient.amount.trim() !== '' && lastIngredient.type.trim() !== '')) {
      // Add a new ingredient only if the last one is not empty
      setNewRecipe(prevState => ({
        ...prevState,
        details: {
          ...prevState.details,
          ingredients: [...prevState.details.ingredients, { name: '', amount: '', type: '' }]
        }
      }));
    }
    setShowIngredientForm(true);
  };

  const handleAddAltIngredient = (ingredientIndex) => {
    setSelectedType("Alternatives")
    setNewRecipe((prevState) => {

      const updatedIngredients = [...prevState.details.ingredients];
      const ingredientToUpdate = updatedIngredients[ingredientIndex];

      if (!ingredientToUpdate.Alternatives) {
        ingredientToUpdate.Alternatives = [];
      }
      ingredientToUpdate.type="Alternatives"

      // Check if the last alternative is empty before adding a new one
      const lastAlternative = ingredientToUpdate.Alternatives[ingredientToUpdate.Alternatives.length - 1];
      if (!lastAlternative || (lastAlternative.name && lastAlternative.amount)) {
        // Add a new alternative ingredient with empty name and amount
        ingredientToUpdate.Alternatives.push({ name: '', amount: '' });
      }

      return {
        ...prevState,
        details: {
          ...prevState.details,
          ingredients: updatedIngredients,
        },
      };
    });
  };

  const handleAltIngredientChange = (ingredientIndex, altIndex, fieldName, value) => {

    setNewRecipe((prevState) => {
      const updatedIngredients = [...prevState.details.ingredients];
      const ingredientToUpdate = updatedIngredients[ingredientIndex];
      const updatedAlternatives = [...ingredientToUpdate.Alternatives];
      updatedAlternatives[altIndex] = {
        ...updatedAlternatives[altIndex],
        [fieldName]: value,
      };
  
      ingredientToUpdate.Alternatives = updatedAlternatives;
  
      return {
        ...prevState,
        details: {
          ...prevState.details,
          ingredients: updatedIngredients,
        },
      };
    });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newValue = e.target.type === 'button' ? e.target.value : value;
    if (e.target.type === 'button')
    {
      setSelectedType(newValue);
    }

    setNewRecipe(prevState => ({
      ...prevState,
      details: {
        ...prevState.details,
        ingredients: prevState.details.ingredients.map((ingredient, i) => i === index ? { ...ingredient, [name]: newValue } : ingredient)
      }
    }));
  };

  const handleSaveIngredient = (index) => {
    const ingredientToAdd = newRecipe.details.ingredients[index];

    // Check if the ingredient to be added is not empty
    if (ingredientToAdd.name.trim() !== '' && ingredientToAdd.amount.trim() !== '' && ingredientToAdd.type.trim() != '') {
      setAddedIngredients(prevIngredients => [...prevIngredients, ingredientToAdd]);
      setShowIngredientForm(false);

        // Clear the input fields after adding the ingredient
      setNewRecipe(prevState => ({
        ...prevState,
        details: {
          ...prevState.details,
          ingredients: prevState.details.ingredients.map((ingredient, i) => i === index ? { name: '', amount: '', type: ''} : ingredient)
        }
      }));
      setSelectedType("none")
    }
    else{
      alert('Please confirm all fields are filled in and a type is selected.');
      return;
    }
  };

  // adding instructions
  const handleAddInstruction = () => {
    const instructions = newRecipe.details.instructions;
    const lastInstruction = instructions[instructions.length - 1];
    if (lastInstruction.trim() != '') {
      // add new instruction if last is not empty
      setNewRecipe(prevState => ({
        ...prevState,
        details: {
          ...prevState.details,
          instructions: [...prevState.details.instructions, '']
        }
      }));
    }
    else{
      alert('Please fill in current instruction.');
      return;
    }
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
    
      // Perform validation
    if (
      newRecipe.title.trim() === '' ||
      newRecipe.difficulty.trim() === '' ||
      newRecipe.time.trim() === '' ||
      newRecipe.about.trim() === '' ||
      newRecipe.details.ingredients.length === 0 ||
      addedIngredients.length === 0 ||
      newRecipe.details.instructions.some(instruction => instruction.trim() === '')
    ) {
      // If any field is blank, display an error message and return early
      alert('Please fill in all fields.');
      return;
    }
    try {
      newRecipe.details.ingredients = addedIngredients;
      newRecipe.file = file;
      // const response = await axios.post('http://localhost:5000/recipes', newRecipe);
      // Make a POST request to the backend with the FormData object
      const response = await axios.post('http://localhost:5000/recipes', newRecipe, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important: Set the content type to multipart/form-data
      },
      });
      console.log(newRecipe)
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
      navigate('/', { state: { newRecipe: response.data } });
      setFile(null)

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
          <div className="dropdown-arrow"></div>
          <span className='post-form-section-title'>/10</span>
          <span className='post-form-section-title'>Image</span>
          <input type='file' name="file" onChange={handleFileChange}/>
          {/* {file && <img src={URL.createObjectURL(file)} alt="Selected Image" />} */}
        </div>
      </div>
      <div className='post-row'>
        <div>
          <span className='post-form-section-title'>Expected Time</span>
          <input className='post-form-number-input' type="number" name="time" value={newRecipe.time} onChange={handleChange} placeholder='00'/>
          <span className='post-form-small-text'>Minutes</span>
        </div>
        <div className='post-form-about-section'>
          <span className='post-form-section-title'>About</span>
          <textarea className='post-form-about-input' type="text" name="about" value={newRecipe.about} onChange={handleChange} placeholder='about this dish'/>
        </div>
      </div>
      <div className='post-row-two'>
        <div className='post-row-two-left'>
          <div className='post-row-two-header'>
            <span className='post-form-section-underlined'>Ingredients</span>
            <button className='post-add-button' type="button" onClick={handleAddIngredient}>+</button>
          </div>
          
          {newRecipe.details.ingredients.map((ingredient, index) => (
            (showIngredientForm) && (
            <div className='add-ingredient-card' key={`ingredient_${index}`}>
              <div className='add-ingredient-card-input-row'>
                <span className='add-ingredient-card-ingredient'>Ingredient</span>
                <input className='add-ingredient-input' key={index} type="text" name="name" value={ingredient.name} onChange={(e) => handleIngredientChange(index, e)} placeholder='ingredient name'/>
              </div>
              <div className='add-ingredient-card-input-row'>
                <span className='add-ingredient-card-amount'>Amount</span>
                <input className='add-ingredient-input' key={index} type="text" name="amount" value={ingredient.amount} onChange={(e) => handleIngredientChange(index, e)} placeholder='ingredient amount'/>
              </div>
              <div className='add-ingredient-card-input-row'>
                <span className='add-ingredient-alternatives-title'>Ingredient Type</span>
              </div>
              <div className='add-ingredient-card-input-row'>
                <button type="button" className={`${selectedType === 'Essential' ? 'ingredient-card-option-button-active' : 'ingredient-card-option-button'}`} name="type" value="Essential" onClick={(e) => handleIngredientChange(index, e)}>Essential</button>
                <button type="button" className={`${selectedType === 'Optional' ? 'ingredient-card-option-button-active' : 'ingredient-card-option-button'}`} name="type" value="Optional" onClick={(e) => handleIngredientChange(index, e)}>Optional</button>
                <button type="button" className={`${selectedType === 'Alternatives' ? 'ingredient-card-option-button-active' : 'ingredient-card-option-button'}`} name="type" value="Alternatives" onClick={() => handleAddAltIngredient(index)}>Alternatives</button>
              </div>
              
              {ingredient.type === 'Alternatives' && ingredient.Alternatives && ingredient.Alternatives.map((alt, altIndex) => (
                
                <div key={`alt_${altIndex}`}>
                  {(altIndex === 0) && (
                  <div >
                    <span className='add-ingredient-alternatives-title'>Alternatives</span>
                  </div>)}
                  <div className='add-ingredient-card-input-row'>
                    <span className='add-ingredient-alt-ing'>Ingredient</span>
                    <input
                      type="text"
                      className='add-ingredient-input'
                      name={`alternativeName_${index}_${altIndex}`}
                      value={alt.name}
                      onChange={(e) => handleAltIngredientChange(index, altIndex, 'name', e.target.value)}
                      placeholder='alternative ingredient name'
                    />
                  </div>
                  <div className='add-ingredient-card-input-row'>
                    <span className='add-ingredient-alt-amo'>Amount</span>
                    <input
                      type="text"
                      className='add-ingredient-input'
                      name={`alternativeAmount_${index}_${altIndex}`}
                      value={alt.amount}
                      onChange={(e) => handleAltIngredientChange(index, altIndex, 'amount', e.target.value)}
                      placeholder='alternative ingredient amount'
                    />
                  </div>
                  {altIndex === ingredient.Alternatives.length - 1 && ( // Display the button only for the last alternative
                      <button type='button' className="add-alt-button" onClick={() => handleAddAltIngredient(index)}>Add Alternative</button>
                  )}
                </div>
              ))}

              <button type="button" className="add-ingredient-button" onClick={() => handleSaveIngredient(index)}>Save Ingredient</button>
            </div>
          )))}
          {addedIngredients.length > 0 && (
            <div>
                {addedIngredients.map((ingredient, index) => (
                  <IngredientCard ingredient={ingredient} key={index}/>
                ))}
            </div>
          )}
        </div>
        <div className='post-row-two-right'>
          <div className='post-row-two-header'>
            <span className='post-form-section-underlined'>Directions</span>
            <button className='post-add-button' type="button" onClick={handleAddInstruction}>+</button>
          </div>
          
          {newRecipe.details.instructions.map((instruction, index) => (
            <div key={index} className='post-instruction-card'>
              <span className='post-instruction-index'>{index + 1}.</span>
              <textarea className='post-instruction' type="text" value={instruction} onChange={(e) => handleInstructionChange(index, e.target.value)} placeholder='enter step here'/>
            </div>
          ))}
        </div>
        
        
      </div>
      
      
      
      <button className="post-recipe-button" type="submit">Add Recipe</button>
    </form>
  );
}

export default Add;
