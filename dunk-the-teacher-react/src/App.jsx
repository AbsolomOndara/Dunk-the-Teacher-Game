import React, { useState } from "react";
import "./App.css";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MAX_TRIES = 6;
const GRID_SIZE = 10;

function App() {
  const [target, setTarget] = useState({
    x: getRandomInt(1, GRID_SIZE),
    y: getRandomInt(1, GRID_SIZE),
  });
  const [tries, setTries] = useState(0);
  const [distance, setDistance] = useState(null);
  const [message, setMessage] = useState("");
  const [xGuess, setXGuess] = useState("");
  const [yGuess, setYGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = (e) => {
    e.preventDefault();
    const x = parseInt(xGuess, 10);
    const y = parseInt(yGuess, 10);
    if (isNaN(x) || isNaN(y) || x < 1 || x > GRID_SIZE || y < 1 || y > GRID_SIZE) {
      setMessage("Please enter values between 1 and 10.");
      return;
    }
    const dist = Math.sqrt(
      Math.pow(target.x - x, 2) + Math.pow(target.y - y, 2)
    );
    setDistance(dist);
    const newTries = tries + 1;
    setTries(newTries);
    if (dist === 0) {
      setMessage("\nOh no! You dunked the teacher. Your grade will suffer!");
      setGameOver(true);
    } else if (newTries >= MAX_TRIES) {
      setMessage(
        `\nBetter luck next time, you are out of tries\nThe teacher was at position X: ${target.x}, Y: ${target.y}\nYour last guess was ${dist.toFixed(2)} units away from the teacher.`
      );
      setGameOver(true);
    } else {
      setMessage(
        `Better luck next time! The distance of that guess from the teacher is ${dist.toFixed(2)}\nYou have ${MAX_TRIES - newTries} tries left.`
      );
    }
    setXGuess("");
    setYGuess("");
  };

  const handleRestart = () => {
    setTarget({ x: getRandomInt(1, GRID_SIZE), y: getRandomInt(1, GRID_SIZE) });
    setTries(0);
    setDistance(null);
    setMessage("");
    setXGuess("");
    setYGuess("");
    setGameOver(false);
  };

  return (
    <div className="App">
      <h1>Dunk the Teacher!</h1>
      <p>Try to guess where the teacher is hiding on a 10x10 grid.</p>
      <p>You have 6 attempts to dunk the teacher by guessing the correct X and Y coordinates.</p>
      <p>X and Y values range from 1 to 10.</p>
      <p>Good luck!</p>
      <form onSubmit={handleGuess}>
        <label>
          X coordinate (1-10):
          <input
            type="number"
            min="1"
            max="10"
            value={xGuess}
            onChange={(e) => setXGuess(e.target.value)}
            disabled={gameOver}
            required
          />
        </label>
        <label>
          Y coordinate (1-10):
          <input
            type="number"
            min="1"
            max="10"
            value={yGuess}
            onChange={(e) => setYGuess(e.target.value)}
            disabled={gameOver}
            required
          />
        </label>
        <button type="submit" disabled={gameOver}>Guess</button>
      </form>
      <div className="message">
        <pre>{message}</pre>
      </div>
      {gameOver && (
        <button onClick={handleRestart}>Restart Game</button>
      )}
    </div>
  );
}

export default App;
