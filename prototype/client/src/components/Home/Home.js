import React, { useState, useEffect } from 'react';
// import recipeList from '../recipeList.json';
import clockImage from '../../assets/Clock.png';
import axios from 'axios';
import './Home.css'

const Home = () => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/recipes')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    const [selectedItem, setSelectedItem] = useState(null);
    const [cardDetails, setCardDetails] = useState({});
    const [selectedTime, setSelectedTime] = useState(null);
    const handleSelection = (item) => {
        const selectedCard = recipes.find(card => card.title === item);
        setSelectedItem(item);
        setSelectedTime(selectedCard.time);
        setCardDetails(selectedCard.details);
    };

    return (
        <div className='homepage'>

            {/* Left Pane */}
            <div className='homepage-left'>
                <h2>Search bar here**</h2>

                {/* Card Container */}
                {recipes.map((recipe) => (
                    <div key={recipe.id}> 
                        <div className='recipelist-card' onClick={() => handleSelection(recipe.title, recipe.details)}>
                            <div className='recipelist-card-left'>
                                <span className='recipelist-card-title'>{recipe.title}</span>
                                <span className='recipelist-card-info'>Time: {recipe.time}</span>
                            </div>
                            <div className='recipelist-card-right'>
                                <span className='recipelist-card-info'>difficulty: {recipe.difficulty}</span>
                                <span className='recipelist-card-info'>user rating x / 10 </span>
                            </div>  
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Pane */}
            <div className='recipe-card'>
            {selectedItem && 
            <div>
                <div className='recipe-card-header'>
                    {/* Recipe title & info */}
                    <div className='recipe-card-title-card'> 
                        <div className='recipe-card-title-card-left'>
                            <span className='recipe-card-title'>{selectedItem}</span>
                            <div>
                                <img src={clockImage}  alt="clock" className="clock-image"/>
                                <span className='recipelist-card-info'>{selectedTime}</span>
                            </div>
                        </div>
                        <div className='recipe-card-title-card-right'>
                            <span className='recipelist-card-info'>difficulty: x/ 10</span>
                            <span className='recipelist-card-info'>user rating x / 10 </span>
                        </div> 
                    </div>
                    {/* I made it button */}
                    <div>
                        <button className='made-it-button'>I made it!</button>
                    </div>
                </div>

                {/* Ingredients and About */}
                <div className='recipe-card-first-row'>
                    <div className='recipe-card-ingredients'>
                        <span className='recipe-card-section'>Ingredients</span>
                    </div>
                    <div className='recipe-card-about'>
                        <span className='recipe-card-section'>About</span>
                    </div>
                </div>
               
                <div>
                    <span className='recipe-card-section'>Recipe</span>
                </div>
                <ul>
                    {cardDetails.ingredients && cardDetails.ingredients.map((ingredient, index) => (
                        <li>{ingredient}</li>
                    ))}
                </ul>
            </div>
            }
            </div>
        </div>
    );
};

export default Home;
