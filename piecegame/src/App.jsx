import { useState } from "react";
import EscolherPuzzle from "./components/EscolherPuzzle";
import Tabuleiro from "./components/Tabuleiro";

const imagens = [
  "./teste1.png",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
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
