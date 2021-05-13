import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe("Testing initial board", function() {

  // smoke test
  it("renders without crashing", function() {
      render(<Board />);
    });
  
  // snapshot of board
  it("matches snapshot", function() {
      const { asFragment } = render(<Board />);
      expect(asFragment()).toMatchSnapshot();
    });
  
  // snapshot of board (no lights)
  it("shows board with no lights", function() {
      const { asFragment } = render(<Board chanceLightStartsOn={1}/>);
      expect(asFragment()).toMatchSnapshot();
    });
  
  it("shows lights are out text", function() {
    const { getByText } = render(<Board chanceLightStartsOn={0}/>);
    expect(getByText("You won")).toBeInTheDocument();
  });
})

describe("clicking the cells", () => {

  it('correct cell toggling', function() {
    const { getAllByRole } = render(
    <Board
      nrows={5}
      ncols={5}
      chanceLightStartsOn={1}
    />)

    const cells = getAllByRole("button");

    // All cells are lit
    cells.forEach(c => {expect(c).toHaveClass("Cell-lit")});

    // center cell click
    fireEvent.click(cells[7]);

    // cells up, down, right, left are lit
    let litCells = [7, 11, 13, 17];
    cells.forEach((c, i) => {
      if (litCells.includes(i)) {
          expect(c).toHaveClass("Cell-lit")
      } else {
          expect(c).not.toHaveClass("Cell-lit")
      }
    });
  });

  it(" you won onclick for board", function() {
    // board set up to win onclick (make it easy by needing only 1 click)
    const { queryByText, getAllByRole } = render(
      <Board nrows={1} ncols={3} chanceLightStartsOn={1} />
    );

    // before click (not lit)
    expect(queryByText("You Won")).not.toBeInTheDocument();
    
    // win game when clicking the middle cell
    const cells = getAllByRole("button");
    fireEvent.click(cells[1]);
    expect(queryByText("You Won")).toBeInTheDocument();
  });

});