import React, { useState, useEffect } from 'react';
// import recipeList from '../recipeList.json';
import clockImage from '../../assets/Clock.png';
import RateItModal from '../RateItModal/RateItModal';
import IngredientCard from '../IngredientCard/IngredientCard';
import axios from 'axios';
import './Home.css'


const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // fetching all recipes from json backend
    useEffect(() => {
        axios.get('http://localhost:5000/recipes')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    // handling user selecting a recipe
    const handleSelection = (recipe) => {
        setSelectedRecipe(recipe); // Set the selected recipe directly
    };

    // handling the i made it rating popup
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // averaging and displaying user difficulty ratings
    const calculateAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 'no user ratings'; // Check if ratings is undefined or empty
        const sum = ratings.reduce((total, rating) => total + rating, 0);
        return `user rating ${sum / ratings.length} / 10`;
    };
    return (
        <div className='homepage'>

            {/* Left Pane */}
            <div className='homepage-left'>
                <h2>Search bar here**</h2>

                {/* Card Container */}
                {recipes.map((recipe) => (
                    <div key={recipe.id}> 
                        <div className='recipelist-card' onClick={() => handleSelection(recipe)}>
                            <div className='recipelist-card-left'>
                                <span className='recipelist-card-title'>{recipe.title}</span>
                                <span className='recipelist-card-info'>Time: {recipe.time}</span>
                            </div>
                            <div className='recipelist-card-right'>
                                <span className='recipelist-card-info'>difficulty: {recipe.difficulty}/10</span>
                                <span className='recipelist-card-info'>{calculateAverageRating(recipe.userRatings)}</span>
                            </div>  
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Pane */}
            <div className='recipe-card'>
            {selectedRecipe && 
            <div>
                <div className='recipe-card-header'>
                    {/* Recipe title & info */}
                    <div className='recipe-card-title-card'> 
                        <div className='recipe-card-title-card-left'>
                            <span className='recipe-card-title'>{selectedRecipe.title}</span>
                            <div className='recipe-card-time'>
                                <img src={clockImage}  alt="clock" className="clock-image"/>
                                <span className='recipelist-card-info'>{selectedRecipe.time}</span>
                            </div>
                        </div>
                        <div className='recipe-card-title-card-right'>
                            <span className='recipelist-card-info'>difficulty: {selectedRecipe.difficulty}/10</span>
                            <span className='recipelist-card-info'>{calculateAverageRating(selectedRecipe.userRatings)}</span>
                        </div> 
                    </div>

                    {/* I made it button */}
                    <div>
                        <button className='made-it-button' onClick={handleOpenModal}>I made it!</button>
                        {isModalOpen && <RateItModal onClose={handleCloseModal} />}
                    </div>
                </div>

                {/* Ingredients, instructions, and About */}
                <div className='recipe-card-first-row'>
                    <div className='recipe-card-ingredients'>
                        <span className='recipe-card-section'>Ingredients</span>
                        {selectedRecipe.details.ingredients && selectedRecipe.details.ingredients.map((ingredient, index) => (
                            <IngredientCard key={index} ingredient={ingredient} />
                        ))}
                    </div>
                    
                    <div className='recipe-card-about'>
                        <span className='recipe-card-section'>About</span>
                        <span className='recipe-card-about'>{selectedRecipe.about}</span>
                    </div>
                </div>
               
                <div>
                    <span className='recipe-card-section'>Recipe</span>
                </div>
                <ul>
                    {selectedRecipe.details.instructions && selectedRecipe.details.instructions.map((instruction, index) => (
                        <div key={index} className='recipe-card-instruction-card'>
                            <span className='recipe-card-instruction-index'>{index + 1}.</span> 
                            <span className='recipe-card-instruction'>{instruction}</span>
                        </div>
                       
                    ))}
                </ul>
            </div>
            }
            </div>
        </div>
    );
};

export default Home;
