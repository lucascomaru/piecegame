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
          <a
            key={index}
            href="#"
            onClick={() => handleImageClick(image)}
            className={selectedImage === image ? "selected" : ""}
          >
            <img src={image} alt={`Paisagem ${index + 1}`} />
          </a>
        ))}
      </div>
      <h2>Selecione uma imagem para começarmos o jogo</h2>
      {selectedImage && (
        <p className="mensagem-instrucao">
          Você selecionou a imagem. Clique em "Iniciar o Jogo" para começar!
        </p>
      )}
      <button onClick={handleIniciarClick} disabled={!selectedImage}>
        Iniciar o Jogo
      </button>
    </div>
  );
};

export default EscolherPuzzle;
