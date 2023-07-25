import { useState, useEffect } from "react";
import "./Tabuleiro.css";

const Tabuleiro = ({ imagem }) => {
  const [puzzle, setPuzzle] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);

  useEffect(() => {
    const initialPuzzle = Array.from({ length: 16 }, (_, index) => ({
      number: index + 1,
      top: `${Math.floor(index / 4) * 100}px`,
      left: `${(index % 4) * 100}px`,
    }));
    setPuzzle(initialPuzzle);
  }, []);

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

  const handleTileMouseDown = (index, event) => {
    event.preventDefault();
    setSelectedTile(index);
  };

  const handleTileMouseEnter = (index) => {
    if (selectedTile !== null && selectedTile !== index) {
      const newPuzzle = [...puzzle];
      const selectedTileData = newPuzzle[selectedTile];
      newPuzzle[selectedTile] = newPuzzle[index];
      newPuzzle[index] = selectedTileData;
      setPuzzle(newPuzzle);
      setSelectedTile(index);
    }
  };

  const handleTileMouseUp = () => {
    setSelectedTile(null);
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
          <div
            key={index}
            className="peca"
            onMouseDown={(event) => handleTileMouseDown(index, event)}
            onMouseEnter={() => handleTileMouseEnter(index)}
            onMouseUp={handleTileMouseUp}
            style={{
              backgroundImage: `url(${imagem})`,
              backgroundPosition: `-${(tile.number - 1) % 4 * 100}px -${Math.floor(
                (tile.number - 1) / 4
              ) * 100}px`,
              top: tile.top,
              left: tile.left,
              zIndex: selectedTile === index ? 1 : "auto",
              border: selectedTile === index ? "2px solid #007bff" : "none",
            }}
          />
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
