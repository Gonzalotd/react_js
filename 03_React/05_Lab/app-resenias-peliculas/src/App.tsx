import { useState } from 'react';
import MovieReviewForm from './components/MovieReviewForm';
import ReviewList from './components/ReviewList';
import './App.css'

function App() {

	const [reviews, setReviews] = useState([]);

  	const handleAddReview = (reviewData) => {

		const newReview = {
			id: Date.now(),
			...reviewData
		};
		setReviews([ newReview, ...reviews ]);
  	}

  return (
    <div className='app'>
		<header className='app-header'>
			<h1>Reseñas de Películas</h1>
			<p>Danos tu opiión sobras las películas que ves</p>
		</header>

		<main className='app-main'>
			<div className="form-section">
				<h2>Agrega tu reseña</h2>
				<MovieReviewForm onAddReview={handleAddReview} /> 
			</div>

			<div className="reviews-section">
			<h2>Reseñas Anteriores ({reviews.length})</h2>
			<ReviewList reviews={reviews} />
			</div>
		</main>
      
		<footer className="app-footer">
			<p>Ejercicio de React - Formulario con React Hook Form</p>
		</footer>
    </div>
  )
}

export default App
