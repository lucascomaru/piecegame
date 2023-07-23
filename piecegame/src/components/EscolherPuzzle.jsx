import { useState } from "react";
import "./EscolherPuzzle.css";

const EscolherPuzzle = ({ imagens, onSelectPuzzle }) => {
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="escolher-puzzle">
      <div className="imagens-container">
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
      <h2>Selecione uma imagem para começarmos o jogo</h2>
      <button onClick={handleIniciarClick}>Iniciar o Jogo</button>
    </div>
  );
};

export default EscolherPuzzle;
