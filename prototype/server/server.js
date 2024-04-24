const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'client/src/assets/recipe_images/',
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  }
});
const upload = multer({ storage: storage });

const app = express();
const PORT = 5000;

// Read recipes from JSON file
const recipesData = JSON.parse(fs.readFileSync('server/recipeList.json', 'utf-8'));
let lastRecipeId = recipesData.length; 

// Serve static files from the 'client/src/assets/recipe_images/' directory
app.use('/assets/recipe_images', express.static(path.join(__dirname, 'client/src/assets/recipe_images')));
app.use(express.json());
app.use(cors()); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Get all recipes
app.get('/recipes', (req, res) => {
  res.json(recipesData);
});

// Add a new recipe with optional image upload
app.post('/recipes', upload.single('file'), (req, res) => {
  const newRecipe = req.body;
  // console.log(newRecipe);

  // Increment the last used recipe ID and assign it to the new recipe
  lastRecipeId++;
  newRecipe.id = lastRecipeId;

  // check if an image was uploaded
  if (req.file) {
    // create new filename format -> recipe_id.filetype
    const originalFilename = req.file.originalname;
    const fileExtension = originalFilename.split('.').pop();
    const newFilename = `recipe_${newRecipe.id}.${fileExtension}`;

    // save image data in your recipe
    newRecipe.image = {
      filename: newFilename,
      type: req.file.mimetype
    };

    // rename to the new format
    fs.renameSync(req.file.path, `client/src/assets/recipe_images/${newFilename}`);
  }

  recipesData.push(newRecipe);
  fs.writeFileSync('server/recipeList.json', JSON.stringify(recipesData));
  res.status(201).json(newRecipe);
});

// Update an existing recipe
app.post('/recipes/:id/rating', (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  // Find the recipe with the given id
  const recipe = recipesData.find(recipe => recipe.id === parseInt(id));

  if (recipe) {
    if (!recipe.userRatings)
    {
      recipe.userRatings = []
    }
    // Update the user ratings for the recipe
    recipe.userRatings.push(rating);
    fs.writeFileSync('server/recipeList.json', JSON.stringify(recipesData));
    res.status(200).json({ message: 'User rating updated successfully' });
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});