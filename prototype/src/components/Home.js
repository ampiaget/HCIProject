import React from 'react';
import recipeList from './recipeList.json';

const Home = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [cardDetails, setCardDetails] = useState({});
    const handleSelection = (item) => {
        const selectedCard = recipeList.find(card => card.title === item);
        setSelectedItem(item);
        setCardDetails(selectedCard.details);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Left Pane */}
            <div style={{ width: '30%', backgroundColor: '#CC4425', padding: '10px', overflowY: 'auto' }}>
                <h2>Select an Item:</h2>
                {/* Card Container */}
                {recipeList.map((recipe) => (
                    <div key={recipe.id} style={{ marginBottom: '5px' }}>
                        <div style={cardStyle} onClick={() => handleSelection(recipe.title, recipe.details)}>
                            <h3>{recipe.title}</h3>
                            <p>Difficulty: {recipe.difficulty} <br/> Time: {recipe.time}</p>
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
