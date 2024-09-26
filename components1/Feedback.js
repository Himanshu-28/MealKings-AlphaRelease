// src/components/Feedback.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFeedback } from '../redux/feedbackSlice'; // Adjust this path if needed

const Feedback = () => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showThanks, setShowThanks] = useState(false);

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setFeedback({ rating, comment }));
        setSubmitted(true);
        setShowThanks(true);
        setRating(null);
        setComment('');
    };

    useEffect(() => {
        if (showThanks) {
            const timer = setTimeout(() => {
                setShowThanks(false);
            }, 3000); // Hide after 4 seconds

            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [showThanks]);

    return (
        <div className="feedback-container text-center">

            <h1 className="feedback-title">Rate Your Experience on Meal Kings</h1>
            <div className="rating-buttons d-flex justify-content-center mt-3 mb-3">
                {[1, 2, 3, 4, 5].map((value) => (
                    <button
                        key={value}
                        onClick={() => handleRatingClick(value)}
                        className={`rating-button ${rating === value ? 'selected' : ''} mx-1`}
                    >
                        {value} {rating === value ? '⭐' : ''}
                    </button>
                ))}
            </div>
            <textarea
                placeholder="Optional feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-control mb-3"
            />
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            {showThanks && (
                <div className="thank-you-message mt-3">
                    Thanks for your feedback! ✔️
                </div>
            )}
        </div>
    );
};

export default Feedback;
