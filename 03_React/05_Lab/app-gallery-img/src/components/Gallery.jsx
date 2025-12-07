import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

const Album = ({ children, title }) => {
  return (
    <div className="album">
      <h3>{title}</h3>
      <div className="album-images">
        {children}
      </div>
    </div>
  );
};

const Image = ({ image, render }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.includes(image.id);

  const handleToggleFavorite = () => {
    toggleFavorite(image.id);
  };

  if (render) {
    return render({
      ...image,
      isFavorite,
      onToggleFavorite: handleToggleFavorite,
    });
  }

  return (
    <div className="image-container">
      <img 
        src={image.url} 
        alt={image.title} 
        className={isFavorite ? 'favorite' : ''}
      />
      <button onClick={handleToggleFavorite}>
        {isFavorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
      <p>{image.title}</p>
    </div>
  );
};

const Gallery = ({ children }) => {
  const albumsData = [
    {
      id: 1,
      title: "Naturaleza",
      images: [
        { id: 1, url: "https://picsum.photos/id/237/300/200", title: "Perro negro" },
        { id: 2, url: "https://picsum.photos/id/238/300/200", title: "Ciudad" },
        { id: 3, url: "https://picsum.photos/id/239/300/200", title: "Montañas" },
      ]
    },
    {
      id: 2,
      title: "Tecnología",
      images: [
        { id: 4, url: "https://picsum.photos/id/240/300/200", title: "Computadora" },
        { id: 5, url: "https://picsum.photos/id/241/300/200", title: "Teléfono" },
        { id: 6, url: "https://picsum.photos/id/242/300/200", title: "Cámara" },
      ]
    }
  ];

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (imageId) => {
    setFavorites(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const allImages = albumsData.flatMap(album => album.images);
  const favoriteImages = allImages.filter(image => favorites.includes(image.id));

  const contextValue = {
    favorites,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      <div className="gallery">
        <div className="favorites-section">
          <h2>Imágenes Favoritas</h2>
          <div className="favorites-list">
            {favoriteImages.length > 0 ? (
              favoriteImages.map(image => (
                <div key={image.id} className="favorite-image">
                  <img src={image.url} alt={image.title} />
                  <p>{image.title}</p>
                </div>
              ))
            ) : (
              <p>No hay imágenes favoritas</p>
            )}
          </div>
        </div>

        {albumsData.map(album => (
          <Album key={album.id} title={album.title}>
            {album.images.map(image => (
              <Image 
                key={image.id} 
                image={image} 
                render={(props) => (
                  <div className="image-container">
                    <img 
                      src={props.url} 
                      alt={props.title} 
                      className={props.isFavorite ? 'favorite' : ''}
                    />
                    <button onClick={props.onToggleFavorite}>
                      {props.isFavorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
                    </button>
                    <p>{props.title}</p>
                  </div>
                )}
              />
            ))}
          </Album>
        ))}

        {children}
      </div>
    </FavoritesContext.Provider>
  );
};

Gallery.Album = Album;
Gallery.Image = Image;

export default Gallery;