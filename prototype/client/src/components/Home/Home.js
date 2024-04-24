import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clockImage from '../../assets/Clock.png';
import RateItModal from '../RateItModal/RateItModal';
import IngredientCard from '../IngredientCard/IngredientCard';
import axios from 'axios';
import './Home.css'

// importing all images from the 'recipe_images' directory for access when recipe selected
const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
};
const images = importAll(require.context('../../assets/recipe_images', false, /\.(png|jpe?g|svg)$/));

const Home = () => {
    const location = useLocation();
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (term) => {setSearchTerm(term.toLowerCase());}
    {/*const handleClearSearch = () => {setSearchTerm('');}  Something in here is broken. Not clearing the text only the the search value*/}
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const handleDifficultyChange = (difficulty) => {setSelectedDifficulty(difficulty);}

    // if coming from post then set the new recipe as selected
    useEffect(() => {
        if (location.state && location.state.newRecipe) { //Forcing lowercase on all searches
            setSelectedRecipe(location.state.newRecipe);
        }
    }, [location.state]);

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
        setIsModalOpen(false)
    };

    // handling the i made it rating popup
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // function to update user ratings and selected recipe after rating submission
    const handleRatingSubmit = async () => {
            try {
                await axios.get('http://localhost:5000/recipes')
                    .then(response => {
                        // update recipes state with the fetched data
                        setRecipes(response.data);
                        
                        // Find the selected recipe in the updated data
                        const updatedSelectedRecipe = response.data.find(recipe => recipe.id === selectedRecipe.id);
                        
                        // Update the selectedRecipe with the new data
                        setSelectedRecipe(updatedSelectedRecipe);
                    })
                    .catch(error => {
                        console.error('Error fetching recipes:', error);
                    });
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
    };
    
    // averaging and displaying user difficulty ratings
    const calculateAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 'no user ratings'; // Check if ratings is undefined or empty
        const sum = ratings.reduce((total, rating) => total + rating, 0);
        const averageRating = sum / ratings.length;
        const roundedRating = Math.round(averageRating); // Round the average rating to the nearest whole number
        return `user rating ${roundedRating} / 10`;
    };

    // convert minutes to hr and m or just m
    const minutesConversion = (minutes) => {
        if (minutes < 60) {
            return `${minutes}m`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            if (remainingMinutes === 0) {
                return `${hours}hr`;
            } else {
                return `${hours}hr ${remainingMinutes}m`;
            }
        }
    };

    // parses instruction to bold the names of the ingredients in the instruction
    // const parseInstruction = (instruction, ingredients) => {
    //     const words = instruction.split(/(\s+)/); // split by whitespace but preserve whitespace characters
    
    //     return words.map((word, index) => {
    //         // Check if the word matches any ingredient name
    //         const isIngredient = ingredients.some((ingredient) =>
    //             ingredient.name.toLowerCase().includes(word.toLowerCase().trim()) // trim the word to remove leading/trailing whitespace
    //         );
    
    //         if (word === " ")
    //         {
    //             return <span key={index}>&nbsp;</span>
    //         }
    
    //         if (isIngredient) {
                
    //             return <strong key={index}>{word}</strong>; // ingredient words are bolded
    //         }

    //         return <span key={index}>{word}</span>; // regular words (not ingredient words)
    //     });
    // };

    return (
        <div className='homepage'>

            {/* Left Pane */}
            <div className='homepage-left'>
                <div className='homepage-search'>
                    <input type="text" className='search-input' placeholder="Search Recipes..." onChange={(e) => handleSearch(e.target.value)} />
                    {/*<button className='clear-button' onClick={handleClearSearch}>Clear</button> Something in here is broken. Not clearing the text*/}
                    <div className='search-filter-dropdown-div'>
                        <span className='homepage-search-info'>Max skill level:</span>
                        <div className="search-dropdown-arrow"></div>
                        <select className='difficulty-dropdown' onChange={(e) => handleDifficultyChange(e.target.value)}>
                            <option value="">All Difficulties</option>
                            {[...Array(10).keys()].map((difficulty) => (
                            <option key={difficulty + 1} value={difficulty + 1}>{difficulty + 1}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Card Container */}
                {/* {recipes.map((recipe) => ( */}
                {recipes.filter((recipe) => 
                    (searchTerm === '' || recipe.title.toLowerCase().includes(searchTerm)) &&  // Search by recipe title
                    (!selectedDifficulty || parseInt(recipe.difficulty) <= parseInt(selectedDifficulty)) // Filter by difficulty (if selected)
                ).map((recipe) => (
                    <div key={recipe.id}> 
                        <div className='recipelist-card' onClick={() => handleSelection(recipe)}>
                            <div className='recipelist-card-left'>
                                <span className='recipelist-card-title'>{recipe.title}</span>
                                <span className='recipelist-card-info'>{minutesConversion(recipe.time)}</span>
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
                                <span className='recipelist-card-info'>{minutesConversion(selectedRecipe.time)}</span>
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
                        {isModalOpen && <RateItModal onClose={handleCloseModal} selectedRecipeId={selectedRecipe.id} onRatingSubmit={handleRatingSubmit} />}

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
                        <span className='recipe-card-about-text'>{selectedRecipe.about}</span>
                    </div>
                </div>
                {selectedRecipe.image && images[selectedRecipe.image.filename] &&
                    <div className='recipe-card-image-div'>
                        <img className='recipe-list-image' src={images[selectedRecipe.image.filename].default} alt="Recipe"/>
                    </div>
                }
                <div>
                    <span className='recipe-card-section'>Recipe</span>
                </div>
                <div>
                    {selectedRecipe.details.instructions && selectedRecipe.details.instructions.map((instruction, index) => (
                        <div key={index} className='recipe-card-instruction-card'>
                            <span className='recipe-card-instruction-index'>{index + 1}.</span> 
                            <span className='recipe-card-instruction'>{instruction}</span>
                        </div>
                       
                    ))}
                </div>
            </div>
            }
            </div>
        </div>
    );
};

export default Home;
