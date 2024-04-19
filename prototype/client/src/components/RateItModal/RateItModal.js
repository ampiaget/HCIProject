import React, { useState } from 'react';
import axios from 'axios';
import './RateItModal.css'
const RateItModal = ({ onClose, selectedRecipeId, onRatingSubmit }) => {

    const [rating, setRating] = useState(0);

    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value));
    };

    const handleSubmit = async () => {
        try {
            if (rating === 0)
            {
                // If rating is 0 alert error and return
                alert('Please select a rating and try again');
                return;
            }

            // Send a request to update the user rating for the selected recipe
            await axios.post(`http://localhost:5000/recipes/${selectedRecipeId}/rating`, { rating });
            // Notify the home component that the rating has been submitted
            onRatingSubmit();
            // Close the modal
            onClose();
            
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };
   

  return (
    <div className="modal-overlay">
        <div className="modal">
        <div className="modal-content">
            {/* Close button */}
            <button className="modal-close-button" onClick={onClose}>x</button>
            <span className='modal-orange-text'>Awesome Cooking!</span>
            <span className='modal-info-text'>We appreciate your feedback. How difficult was this recipe?</span>
            {/* Dropdown for rating */}
            <div className='modal-dropwdown-row'>
            <select className='modal-difficulty-dropdown' id="rating" value={rating} onChange={handleRatingChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
            <div className="modal-dropdown-arrow"></div>
            <span className='modal-dropdown-text'> /10</span>
            </div>
            {/* Submit button */}
            <button className='modal-submit-button' onClick={handleSubmit}>Rate it!</button>
        </div>
        </div>
    </div>
  );
};

export default RateItModal;