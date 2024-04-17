import React from "react";
import essential_star from '../../assets/Star.png';
import checkmark from '../../assets/Checkbox.png';
import './IngredientCard.css'

const IngredientCard = ({ingredient}) => {
    return (
        <div className="ingredient-card">
            <div className="ingredient-card-left">
                <span className="ingredient-card-name">{ingredient.name}</span>
                <span className="ingredient-card-amount">{ingredient.amount} </span>
            </div>
            <div className="ingredient-card-right">

                {ingredient.type === "essential" && (
                    <span className="ingredient-type-star">&#9733;</span>
                )}
                {ingredient.type === "alternative" && (
                    <div>
                    <select className="ingredient-alternatives-dropdown">
                        {ingredient.alternatives.map((alt, index) => (
                            <option key={index} className="alternative-option">{alt.name}</option>
                        ))}
                    </select>
                    <div class="dropdown-arrow"></div>
                    </div>
                )}
                {ingredient.type === "optional" && (
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