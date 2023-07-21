import React from "react";
import EscolherPuzzle from "./components/EscolherPuzzle";

const imagens = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  
];

const App = () => {
  const handlePuzzleSelect = (selectedImage) => {
    console.log("Imagem selecionada:", selectedImage);
    
  };

  return (
    <div>
      <h1>Quebra-Cabeças</h1>
      <EscolherPuzzle imagens={imagens} onSelectPuzzle={handlePuzzleSelect} />
    </div>
  );
};

export default App;
