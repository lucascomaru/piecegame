import React, { useState, useRef } from "react";

const EscolherPuzzle = ({ imagens, onSelectPuzzle }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [carrosselIndex, setCarrosselIndex] = useState(0);
  const carrosselRef = useRef(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleIniciarClick = () => {
    if (selectedImage) {
      onSelectPuzzle(selectedImage);
    } else {
      alert("Selecione uma imagem antes de iniciar o jogo!");
    }
  };

  const slideCarrossel = (direction) => {
    const carrossel = carrosselRef.current;
    const carrosselItem = carrossel.firstChild;
    const carrosselItemWidth = carrosselItem.offsetWidth;
    const carrosselWidth = carrossel.offsetWidth;
    const totalImages = imagens.length;
    const visibleImages = 5; 
    const distanceBetweenImages = 20; 
    const maxCarrosselIndex = totalImages - visibleImages;

    if (direction === "prev") {
      setCarrosselIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    } else if (direction === "next") {
      setCarrosselIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  return (
    <div className="escolher-puzzle">
      <div className="carrossel" ref={carrosselRef}>
        <div
          className="carrossel-wrapper"
          style={{
            transform: `translateX(-${carrosselIndex * (150 + 20)}px)`,
          }}
        >
          {imagens.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagem ${index + 1}`}
              onClick={() => handleImageClick(image)}
              className={selectedImage === image ? "selected" : ""}
            />
          ))}
        </div>
        <button
          className="carrossel-button prev"
          onClick={() => slideCarrossel("prev")}
        >
          &#10094;
        </button>
        <button
          className="carrossel-button next"
          onClick={() => slideCarrossel("next")}
        >
          &#10095;
        </button>
      </div>
      <p>Selecione o quebra-cabeças que vamos montar</p>
      <button onClick={handleIniciarClick}>Iniciar o Jogo</button>
    </div>
  );
};

export default EscolherPuzzle;
