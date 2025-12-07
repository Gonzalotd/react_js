import React from 'react';
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="no-reviews">
        <p>Aún no hay reseñas. ¡Sé el primero en opinar!</p>
      </div>
    );
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-header">
            <h3 className="review-title">{review.title} ({review.year})</h3>
            <span className={`review-recommendation ${review.recommendation === 'Sí' ? 'recommended' : 'not-recommended'}`}>
              {review.recommendation === 'Sí' ? '👍 Recomendada' : '👎 No recomendada'}
            </span>
          </div>
          
          <div className="review-genres">
            <strong>Géneros:</strong>
            <div className="genres-list">
              {review.genres.map((genre, index) => (
                <span key={index} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
          </div>
          
          {review.comment && (
            <div className="review-comment">
              <strong>Comentario:</strong>
              <p>{review.comment}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;