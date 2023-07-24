import { useState, useEffect } from "react";
import "./Tabuleiro.css";

const Tabuleiro = ({ imagem }) => {
  const initialPuzzle = Array.from({ length: 16 }, (_, index) => index + 1);

  const [puzzle, setPuzzle] = useState(initialPuzzle);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleTileClick = (index) => {
    const emptyTileIndex = puzzle.indexOf(16);
    if (isTileMovable(index, emptyTileIndex)) {
      const newPuzzle = [...puzzle];
      newPuzzle[emptyTileIndex] = puzzle[index];
      newPuzzle[index] = 16;
      setPuzzle(newPuzzle);

      if (isPuzzleCompleted(newPuzzle)) {
        handlePuzzleCompleted();
      }
    }
  };

  const isTileMovable = (tileIndex, emptyIndex) => {
    const diff = Math.abs(tileIndex - emptyIndex);
    return (diff === 1 && Math.floor(tileIndex / 4) === Math.floor(emptyIndex / 4)) || (diff === 4);
  };

  const isPuzzleCompleted = (puzzle) => {
    return puzzle.every((tile, index) => (index === 15 ? tile === 16 : tile === index + 1));
  };

  const handlePuzzleCompleted = () => {
    alert("Parabéns, você completou o desafio!");
    setIsActive(false);
  };

  const handleStartTimer = () => {
    setIsActive(true);
  };

  const handleStopTimer = () => {
    setIsActive(false);
  };

  const handleResetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="tabuleiro">
      <button onClick={() => window.history.back()} className="voltar-button">
        Voltar
      </button>
      <h2>Vamos montar o quebra-cabeça: {imagem}</h2>
      <div className="quebra-cabeca">
        {puzzle.map((tile, index) => (
          <div key={index} className="peca" onClick={() => handleTileClick(index)}>
            {tile !== 16 && <img src={imagem} alt={`Peça ${tile}`} />}
          </div>
        ))}
      </div>
      <div className="cronometro">
        <p>Tempo: {seconds} segundos</p>
        {!isActive ? (
          <button onClick={handleStartTimer}>Iniciar Cronômetro</button>
        ) : (
          <button onClick={handleStopTimer}>Parar Cronômetro</button>
        )}
        <button onClick={handleResetTimer}>Resetar Cronômetro</button>
      </div>
    </div>
  );
};

export default Tabuleiro;
