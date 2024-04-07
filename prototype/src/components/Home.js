import React from 'react';

const Home = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const handleSelection = (item) => {
        setSelectedItem(item);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Left Pane */}
            <div style={{ width: '30%', backgroundColor: '#CC4425', padding: '10px', overflowY: 'auto' }}>
                <h2>Select an Item:</h2>
                {/* Card Container */}
                <div style={{ marginBottom: '10px' }}>
                    <div style={cardStyle} onClick={() => handleSelection('Honey Sriracha Salmon')}>
                        <h3>Honey Sriracha Salmon</h3>
                        <p>Time: 1h25m</p>
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <div style={cardStyle} onClick={() => handleSelection('Seared Tuna Steaks')}>
                        <h3>Seared Tuna Steaks</h3>
                        <p>Lorem</p>
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <div style={cardStyle} onClick={() => handleSelection('Cajun Chicken')}>
                        <h3>Cajun Chicken</h3>
                        <p>ipsum</p>
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <div style={cardStyle} onClick={() => handleSelection('Snoop Dogg\'s Lobster Thermidor')}>
                        <h3>Snoop Dogg's Lobster Thermidor</h3>
                        <p>dolor</p>
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <div style={cardStyle} onClick={() => handleSelection('Julia Child\'s Beef Bourginon')}>
                        <h3>Julia Child's Beef Bourginon</h3>
                        <p>sit</p>
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <div style={cardStyle} onClick={() => handleSelection('Kraft Mac N\' Cheese')}>
                        <h3>Kraft Mac N' Cheese</h3>
                        <p>amet</p>
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <div style={cardStyle} onClick={() => handleSelection('Cajun Butter Salmon')}>
                        <h3>Cajun Butter Salmon</h3>
                        <p>consectetur</p>
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <div style={cardStyle} onClick={() => handleSelection('Key Lime Pie')}>
                        <h3>Key Lime Pie</h3>
                        <p>adipiscing</p>
                    </div>
                </div>
            </div>

            {/* Right Pane */}
            <div style={{ width: '70%', backgroundColor: '#e0e0e0', padding: '10px', overflowY: 'auto' }}>
                <div style={recipeHeaderStyle}>
                    <h2>Recipe for {selectedItem}</h2>
                </div>
                {selectedItem && <p>{selectedItem}</p>}
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
