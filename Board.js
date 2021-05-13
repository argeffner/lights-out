import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *  
 *  Give hanceLightStartsOn a smaller value to have less lights on,
 *  don't need to apply any multiplier to Math.random (0 to 1) range
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.3 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++){
      let row = [];
      for (let x = 0; x < ncols; x++){
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // check every row and in each row check every element
    return board.every(row => row.every(dark => !dark))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy =  JSON.parse(JSON.stringify(oldBoard));  // use oldBoard
      // Shallow copy 
      // const boardCopy = oldBoard.map(row => [...row]);


      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy); // Center cell
      flipCell(y, x + 1, boardCopy); // Right Cell
      flipCell(y, x - 1, boardCopy); // Left Cell
      flipCell(y + 1, x, boardCopy); // Bottom Cell
      flipCell(y - 1, x, boardCopy); // Top Cell

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div> You Won </div>;
  }

  // make table board (react: build the table with divs)
  let tBoard = [];
  for (let y = 0; y < nrows; y++){
    let row = [];
    for (let x = 0; x < ncols; x++){
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord} isLit={board[y][x]} 
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
  tBoard.push(<tr key={y}> {row} </tr>);
 }
//  return board 
  return (
    <table className="lightBoard">
      <tbody> {tBoard} </tbody>
    </table>
  );
}

export default Board;
