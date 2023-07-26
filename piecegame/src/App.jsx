import { useState } from "react";
import EscolherPuzzle from "./components/EscolherPuzzle";
import Tabuleiro from "./components/Tabuleiro";

const imagens = [
  "./naruto.jpeg",
  "./tanjiro.jpg",
  "./swordart.jpg",
  "./dragonb.jpg",
  "cavaleiros.jpg",
];

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePuzzleSelect = (selectedImage) => {
    setSelectedImage(selectedImage);
  };

  const handleBackToSelection = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <h1>Quebra-Cabeças</h1>
      {selectedImage ? (
        <Tabuleiro imagem={selectedImage} />
      ) : (
        <EscolherPuzzle imagens={imagens} onSelectPuzzle={handlePuzzleSelect} />
      )}
      {selectedImage && (
        <button onClick={handleBackToSelection} className="voltar-button">
          Voltar para seleção
        </button>
      )}
    </div>
  );
};

export default App;
