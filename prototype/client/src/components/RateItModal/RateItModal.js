import React, { useState } from 'react';
const RateItModal = ({ onClose, selectedRecipeId, onRatingSubmit }) => {

    const [rating, setRating] = useState(0);

    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value));
    };

    const handleSubmit = () => {
        // Submit the rating
        onRatingSubmit(selectedRecipeId, rating);
        // Close the modal
        onClose();
    };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Rate Difficulty</h2>
        {/* Dropdown for rating */}
        <label htmlFor="rating">Select difficulty:</label>
        <select id="rating" value={rating} onChange={handleRatingChange}>
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
        
        {/* Submit button */}
        <button onClick={handleSubmit}>Submit</button>
        {/* Close button */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RateItModal;