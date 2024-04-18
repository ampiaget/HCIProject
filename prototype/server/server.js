const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Read recipes from JSON file
const recipesData = JSON.parse(fs.readFileSync('server/recipeList.json', 'utf-8'));

// needs to change to however many recipes we put in there
let lastRecipeId = 4; 

// Get all recipes
app.get('/recipes', (req, res) => {
  res.json(recipesData);
});

// Add a new recipe
app.post('/recipes', (req, res) => {
  const newRecipe = req.body;

  // Increment the last used recipe ID and assign it to the new recipe
  lastRecipeId++;
  newRecipe.id = lastRecipeId;


  recipesData.push(newRecipe);
  fs.writeFileSync('server/recipeList.json', JSON.stringify(recipesData));
  res.status(201).json(newRecipe);
});

// Update an existing recipe
app.put('/recipes/:id', (req, res) => {
  const recipeId = req.params.id;
  const updatedRecipe = req.body;
  const index = recipesData.findIndex(recipe => recipe.id === parseInt(recipeId));
  if (index !== -1) {
    recipesData[index] = updatedRecipe;
    fs.writeFileSync('server/recipeList.json', JSON.stringify(recipesData));
    res.json(updatedRecipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

// Delete a recipe
app.delete('/recipes/:id', (req, res) => {
  const recipeId = req.params.id;
  const index = recipesData.findIndex(recipe => recipe.id === parseInt(recipeId));
  if (index !== -1) {
    recipesData.splice(index, 1);
    fs.writeFileSync('server/recipeList.json', JSON.stringify(recipesData));
    res.json({ message: 'Recipe deleted' });
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
