import React, { useState } from 'react';
import recipeList from '../recipeList.json';
import './Home.css'

const Home = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [cardDetails, setCardDetails] = useState({});
    const handleSelection = (item) => {
        const selectedCard = recipeList.find(card => card.title === item);
        setSelectedItem(item);
        setCardDetails(selectedCard.details);
    };

    return (
        <div className='homepage'>

            {/* Left Pane */}
            <div className='homepage-left'>
                <h2>Search bar here**</h2>

                {/* Card Container */}
                {recipeList.map((recipe) => (
                    <div key={recipe.id} className='recipelist-card'> 
                        <div onClick={() => handleSelection(recipe.title, recipe.details)}>
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
            <div style={{ width: '70%', backgroundColor: '#e0e0e0', padding: '10px', overflowY: 'auto' }}>
                <div style={recipeHeaderStyle}>
                    <h2>Recipe for {selectedItem}</h2>
                </div>
                {selectedItem && 
                <p>{selectedItem}<br />
                Ingredients:<br /> 
                <ul>
                    {cardDetails.ingredients && cardDetails.ingredients.map((ingredient, index) => (
                        <li>{ingredient}</li>
                    ))}
                </ul>
                </p>
                }

            </div>
        </div>
    );
};

// CSS for the card style
const cardStyle = {
    position: 'relative',
    left: '-15px', //-2%
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',

};

//CSS for the header inside the right pane
const recipeHeaderStyle = {
    position: 'relative',
    left: '-15px',
    top: '-15px',
    width: '500px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#7c7e82',
}



export default Home;
