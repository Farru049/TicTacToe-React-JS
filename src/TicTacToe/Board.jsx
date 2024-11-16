import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  // Function to determine the winner
  const checkWinner = (currentState) => {
    const winningCombinations = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentState[a] &&
        currentState[a] === currentState[b] &&
        currentState[a] === currentState[c]
      ) {
        return currentState[a]; // Return the winner ("X" or "O")
      }
    }

    return null; // No winner yet
  };

  const handleClick = (index) => {
    if (state[index] || winner) {
      // If square is already filled or there is a winner, ignore the click
      return;
    }

    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setIsXTurn(!isXTurn);

    // Check for a winner
    const newWinner = checkWinner(copyState);
    if (newWinner) {
      setWinner(newWinner);
    } else if (copyState.every((square) => square !== null)) {
      setWinner("Tie"); // If all squares are filled and no winner
    }
  };

  return (
    <div className="board-container">
      <h2>
        {winner
          ? winner === "Tie"
            ? "It's a Tie!"
            : `Winner: ${winner}`
          : `Next Turn: ${isXTurn ? "X" : "O"}`}
      </h2>
      <div className="board-row">
        <Square onClick={() => handleClick(0)} value={state[0]} />
        <Square onClick={() => handleClick(1)} value={state[1]} />
        <Square onClick={() => handleClick(2)} value={state[2]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(3)} value={state[3]} />
        <Square onClick={() => handleClick(4)} value={state[4]} />
        <Square onClick={() => handleClick(5)} value={state[5]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(6)} value={state[6]} />
        <Square onClick={() => handleClick(7)} value={state[7]} />
        <Square onClick={() => handleClick(8)} value={state[8]} />
      </div>
      {winner && (
        <button
          style={{
            color: "Black",
            borderRadius: "2px",
            backgroundColor:"blue",
          }}
          onClick={() => {
            setState(Array(9).fill(null)); // Reset the board
            setWinner(null); // Reset the winner
            setIsXTurn(true); // Reset turn to X
          }}
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default Board;
