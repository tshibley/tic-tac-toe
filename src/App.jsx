import { useState } from 'react'
import './App.css'

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

function Board({ squares, onSquareClick }) {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  )
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  function handleClick(i) {
    if (squares.some(square => square !== null)) {
      return
    }
    
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'O' : 'X'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  function handleNewGame() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  const winner = calculateWinner(squares)
  const isDraw = squares.every(square => square !== null)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else if (isDraw) {
    status = 'Draw!'
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <Board squares={squares} onSquareClick={handleClick} />
      <button className="new-game-btn" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  )
}

export default App
