import React, { useEffect, useState } from "react";
import essential_star from '../../assets/Star.png';
import checkmark from '../../assets/Checkbox.png';
import './IngredientCard.css'

const IngredientCard = ({ingredient}) => {

    const [showAlternative, setShowAlternative] = useState(null);
    const [cardIngredient, setCardIngredient] = useState(ingredient);

    useEffect(() => {
        setCardIngredient(ingredient);
    }, [ingredient]);

    const handleDropdownClicked = () => {
        setShowAlternative(!showAlternative);
    }

    const handleIngredientChange = (alt) => {
        setCardIngredient(alt);
        handleDropdownClicked();
    }

    return (
        <div className="ingredient-card">
            <div className="ingredient-card-left">
                <span className="ingredient-card-name">{cardIngredient.name}</span>
                <span className="ingredient-card-amount">{cardIngredient.amount} </span>
                {showAlternative &&
                    <div className="ingredient-alternatives-dropdown">
                        <button className="alternative-option" onClick={() => handleIngredientChange(ingredient)}>
                                <span className="ingredient-card-name">{ingredient.name}</span>
                                <span className="ingredient-card-amount">{ingredient.amount}</span>
                        </button>
                        {ingredient.Alternatives.map((alt, index) => (
                            <button key={index} className="alternative-option" onClick={() => handleIngredientChange(alt)}>
                                <span className="ingredient-card-name">{alt.name}</span>
                                <span className="ingredient-card-amount">{alt.amount}</span>
                            </button>
                        ))}
                    </div>
                }
            </div>
            <div className="ingredient-card-right">

                {ingredient.type === "Essential" && (
                    <span className="ingredient-type-star">&#9733;</span>
                )}
                {ingredient.type === "Alternatives" && (
                    <button type="button" onClick={handleDropdownClicked} className="dropdown-button">
                        <div className="dropdown-arrow"></div>
                    </button>
                )}
                {ingredient.type === "Optional" && (
                    <input
                        type="checkbox"
                        className="ingredient-type-checkbox"
                        id={ingredient.name}
                    />
                )}

                <span className="ingredient-card-type">{ingredient.type}</span>

            </div>
            
        </div>
    );
}

export default IngredientCard;