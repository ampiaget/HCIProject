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
                    // <img src={essential_star} alt="Star" className="ingredient-type-image" />
                    <span className="ingredient-type-star">&#9733;</span>
                )}
                {/* {ingredient.type === "alternative" && (
                    <select className="ingredient-alternatives-dropdown">
                        {ingredient.alternatives.map((alt, index) => (
                            <option key={index}>{alt}</option>
                        ))}
                    </select>
                )} */}
                {ingredient.type === "optional" && (
                    <input
                        type="checkbox"
                        className="ingredient-type-checkbox"
                        id={ingredient.name} // Use a unique identifier for each checkbox
                    />
                )}
                {/* if ingredient type == essential show star image
                if ingredient type == alternatives show dropdown of alternative
                if ingredient type == optional show checkmark image */}
                <span className="ingredient-card-type">{ingredient.type}</span>

            </div>
            
        </div>
    );
}

export default IngredientCard;