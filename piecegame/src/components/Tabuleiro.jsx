import { useState, useEffect } from "react";
import "./Tabuleiro.css";

const Tabuleiro = ({ imagem }) => {
  const initialPuzzle = Array.from({ length: 16 }, (_, index) => index);

  const [puzzle, setPuzzle] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);

  const shufflePuzzle = () => {
    const shuffledPuzzle = Array.from({ length: 16 }, (_, index) => index);
    for (let i = shuffledPuzzle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPuzzle[i], shuffledPuzzle[j]] = [shuffledPuzzle[j], shuffledPuzzle[i]];
    }
    setPuzzle(shuffledPuzzle);
    setIsPuzzleComplete(false);
    setIsActive(true);
    setSeconds(0);
  };

  useEffect(() => {
    shufflePuzzle();
  }, [imagem]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const handleTileClick = (index) => {
    setSelectedTileIndex(index);
    setOffset({ x: 0, y: 0 });
  };

  const handleTileDragStart = (e, index) => {
    setSelectedTileIndex(index);
    setOffset({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleTileDragOver = (e) => {
    e.preventDefault();
  };

  const handleTileDrop = (e, index) => {
    e.preventDefault();
    const draggedTileIndex = selectedTileIndex;
    if (draggedTileIndex !== null && draggedTileIndex !== index) {
      const newPuzzle = [...puzzle];
      const draggedTileNumber = puzzle[draggedTileIndex];
      newPuzzle[draggedTileIndex] = puzzle[index];
      newPuzzle[index] = draggedTileNumber;
      setPuzzle(newPuzzle);
      setSelectedTileIndex(null);
      if (isPuzzleCompleted(newPuzzle)) {
        setIsPuzzleComplete(true);
        setIsActive(false);
      }
    }
  };

  const isPuzzleCompleted = (puzzle) => {
    return puzzle.every((tile, index) => (index === 15 ? tile === 15 : tile === index));
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
      <h2>Vamos montar o quebra-cabeça</h2>
      <div className="quebra-cabeca">
        {puzzle.map((tile, index) => (
          <div
            key={index}
            className="peca"
            onClick={() => handleTileClick(index)}
            draggable={true}
            onDragStart={(e) => handleTileDragStart(e, index)}
            onDragOver={handleTileDragOver}
            onDrop={(e) => handleTileDrop(e, index)}
            style={{
              backgroundImage: `url(${imagem})`,
              backgroundSize: "400% 400%",
              backgroundPosition: `-${(tile % 4) * 100}% -${Math.floor(tile / 4) * 100}%`,
              left: `${(index % 4) * 100}px`,
              top: `${Math.floor(index / 4) * 100}px`,
              zIndex: selectedTileIndex === index ? 1 : "auto",
              position: "absolute",
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
      {isPuzzleComplete && <div className="mensagem">Parabéns, você completou o desafio!</div>}
    </div>
  );
};

export default Tabuleiro;
