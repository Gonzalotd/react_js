import React from 'react';
import { useForm } from 'react-hook-form';
import './MovieReviewForm.css';

const MovieReviewForm = ({ onAddReview }) => {
  const genres = [
    { id: 'accion', label: 'Acción' },
    { id: 'comedia', label: 'Comedia' },
    { id: 'drama', label: 'Drama' },
    { id: 'ciencia-ficcion', label: 'Ciencia ficción' },
    { id: 'animacion', label: 'Animación' },
    { id: 'terror', label: 'Terror' },
    { id: 'romance', label: 'Romance' },
    { id: 'documental', label: 'Documental' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      year: '',
      recommendation: '',
      genres: [],
      comment: ''
    }
  });

  const onSubmit = (data) => {
    onAddReview(data);
    reset();
  };

  const commentValue = watch('comment') || '';
  const commentLength = commentValue.length;

  return (
    <form className="review-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Título de la película *
        </label>
        <input
          id="title"
          type="text"
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="Ej: El Padrino"
          {...register('title', {
            required: 'El título es obligatorio',
            minLength: {
              value: 2,
              message: 'El título debe tener al menos 2 caracteres'
            },
            maxLength: {
              value: 100,
              message: 'El título no puede tener más de 100 caracteres'
            }
          })}
        />
        {errors.title && (
          <p className="error-message">{errors.title.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="year" className="form-label">
          Año de estreno *
        </label>
        <input
          id="year"
          type="number"
          className={`form-input ${errors.year ? 'error' : ''}`}
          placeholder="Ej: 1994"
          {...register('year', {
            required: 'El año es obligatorio',
            min: {
              value: 1900,
              message: 'El año debe ser 1900 o posterior'
            },
            max: {
              value: new Date().getFullYear(),
              message: `El año no puede ser posterior a ${new Date().getFullYear()}`
            },
            valueAsNumber: true
          })}
        />
        {errors.year && (
          <p className="error-message">{errors.year.message}</p>
        )}
      </div>

      <div className="form-group">
        <p className="form-label">¿La recomendarías? *</p>
        <div className="radio-group">
          <div className="radio-option">
            <input
              id="recommend-yes"
              type="radio"
              value="Sí"
              {...register('recommendation', {
                required: 'Debes seleccionar una opción'
              })}
            />
            <label htmlFor="recommend-yes" className="radio-label">
              Sí
            </label>
          </div>
          <div className="radio-option">
            <input
              id="recommend-no"
              type="radio"
              value="No"
              {...register('recommendation', {
                required: 'Debes seleccionar una opción'
              })}
            />
            <label htmlFor="recommend-no" className="radio-label">
              No
            </label>
          </div>
        </div>
        {errors.recommendation && (
          <p className="error-message">{errors.recommendation.message}</p>
        )}
      </div>

      <div className="form-group">
        <p className="form-label">Géneros que se aplican *</p>
        <div className="checkbox-group">
          {genres.map((genre) => (
            <div key={genre.id} className="checkbox-option">
              <input
                id={genre.id}
                type="checkbox"
                value={genre.label}
                {...register('genres', {
                  required: 'Debes seleccionar al menos un género',
                  validate: (value) => value.length > 0 || 'Debes seleccionar al menos un género'
                })}
              />
              <label htmlFor={genre.id} className="checkbox-label">
                {genre.label}
              </label>
            </div>
          ))}
        </div>
        {errors.genres && (
          <p className="error-message">{errors.genres.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="comment" className="form-label">
          Comentario (opcional)
        </label>
        <textarea
          id="comment"
          className={`form-textarea ${errors.comment ? 'error' : ''}`}
          placeholder="Escribe tu opinión sobre la película..."
          rows="4"
          {...register('comment', {
            maxLength: {
              value: 500,
              message: 'El comentario no puede tener más de 500 caracteres'
            }
          })}
        />
        <div className="textarea-info">
          <span className={`char-count ${commentLength > 500 ? 'error' : ''}`}>
            {commentLength}/500
          </span>
        </div>
        {errors.comment && (
          <p className="error-message">{errors.comment.message}</p>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={() => reset()}>
          Limpiar formulario
        </button>
        <button type="submit" className="btn btn-primary">
          Enviar reseña
        </button>
      </div>
    </form>
  );
};

export default MovieReviewForm;