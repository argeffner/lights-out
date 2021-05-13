import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Cell";

//  need to make a comparitive cell value 
// based on previous 
BeforeEach(()=>{
    // why does td not work? Do I first need to add a tr?
  let tr = document.createElement("tr");
  let item = document.body.appendChild(tr);
});

// smoke test
it("renders without crashing", function() {
    render(<Cell />, {item});
  });

// snapshot of cell that is lit
it("matches snapshot of lit cell", function() {
    const { asFragment } = render(<Cell isLit/>, {item});
    expect(asFragment()).toMatchSnapshot();
  });

// snapshot of cell that is not lit
it("matches snapshot of unlit cell", function() {
    const { asFragment } = render(<Cell />, {item});
    expect(asFragment()).toMatchSnapshot();
  });
