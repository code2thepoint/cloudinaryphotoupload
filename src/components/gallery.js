import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gallery() {
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/images');
      setImages(response.data);  
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
    }
  };

  const handleDeleteImage = async (_id, e) => {
    e.stopPropagation();  

    try {
      const response =  await axios.delete(`http://localhost:4000/images/${_id}`);
      console.log('Delete response:', response);

      fetchImages();  
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (

    <div className="gallery__page">
    <div className="gallery__warp">
      <div className="row">
        {images.map((image, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={image._id}>
            <div
              className="gallery__item fresco"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a className="fresco" href={image.firstImage} data-fresco-group="gallery">
                <img src={image.firstImage} style={{ width: '100%', height: 'auto' }} alt={`Image ${image._id}`} />
              </a>
              {hoveredIndex === index && (
                <span
                  className="delete-image"
                  onClick={(e) => handleDeleteImage(image._id, e)}
                >
                  ×
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
}

export default Gallery;