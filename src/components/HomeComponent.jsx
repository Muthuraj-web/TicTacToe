import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

function Node(rowIndex, colIndex) {
  this.val = null;
  this.isSelected = false;
  this.rowIndex = rowIndex;
  this.colIndex = colIndex;
}

function HomeComponent() {
  this.state = {
    gridSize: 5,
    grid: [],
    currentPlayer: true,
    end: false
  };

  this.componentDidMount = function () {
    this.setState({
      grid: this.initializeGrid(5)
    });
  };

  this.render = function () {
    let grid = this.state.grid;
    return (
      <div className="container m-auto" style={{ fontFamily: "courier" }}>
        <div
          className="m-auto"
          style={{ width: `${this.state.gridSize * 70}px` }}
        >
          <h1>Tic-Tac-Toe</h1>
          <span>
            {this.state.gridSize} x {this.state.gridSize}
          </span>
          <button
            className="btn border-dark rounded-0 m-2 p-2"
            onClick={() => {
              this.editGridSize(-2);
            }}
          >
            &lt;
          </button>
          <button
            className="btn border-dark rounded-0 m-2 p-2"
            onClick={() => {
              this.editGridSize(2);
            }}
          >
            &gt;
          </button>
          <button
            className="btn btn-danger rounded-0 m-2 p-2"
            onClick={() => {
              this.reset();
            }}
          >
            RESET
          </button>
        </div>
        <br></br>
        {grid.map((row) => {
          return (
            <div
              style={{
                margin: "0px auto",
                padding: "0px",
                width: `${this.state.gridSize * 70}px`
              }}
            >
              {row.map((cell) => {
                return (
                  <div
                    onClick={() => {
                      this.markCell(cell.rowIndex, cell.colIndex);
                    }}
                    style={{
                      margin: "0px",
                      padding: "0px",
                      display: "inline-block",
                      width: "70px",
                      height: "70px",
                      border: "2px solid black",
                      borderCollapse: "collapse",
                      backgroundColor: cell.isSelected ? "limegreen" : "white",
                      color: cell.isSelected ? "red" : "black"
                    }}
                  >
                    <p
                      className="m-0 p-4"
                      style={{
                        visibility: cell.val ? "visible" : "hidden",
                        fontWeight: cell.isSelected ? "bold" : "normal"
                      }}
                    >
                      {cell.val ? cell.val : "X"}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
        <br />
        <p
          style={{
            margin: "0px auto",
            padding: "0px",
            width: `${this.state.gridSize * 70}px`
          }}
        >
          with{" "}
          <span role="img" aria-labelledby="heart">
            ❤️
          </span>{" "}
          from{" "}
          <a
            href={"https://github.com/Muthuraj-web/"}
            rel="noreferrer"
            target="_blank"
          >
            Candy
          </a>
        </p>
      </div>
    );
  };
}

HomeComponent.prototype = Object.assign(Component.prototype);
HomeComponent.prototype.constructor = HomeComponent;

HomeComponent.prototype.editGridSize = function (inc) {
  this.setState({
    gridSize: Math.max(3, this.state.gridSize + inc),
    grid: this.initializeGrid(Math.max(3, this.state.gridSize + inc)),
    end: false
  });
};

HomeComponent.prototype.initializeGrid = function (size) {
  let grid = [];
  for (let row = 0; row < size; row++) {
    let newRow = [];

    for (let col = 0; col < size; col++) {
      newRow.push(new Node(row, col));
    }

    grid.push(newRow);
  }
  return grid;
};

HomeComponent.prototype.markCell = function (row, col) {
  const node = this.state.grid[row][col];
  if (node.val || this.state.end) return;

  node.val = this.state.currentPlayer ? "X" : "O";

  this.setState({
    currentPlayer: !this.state.currentPlayer,
    end: this.validateWinner(row, col)
  });
};

HomeComponent.prototype.reset = function () {
  console.log(this);

  this.setState({
    grid: this.initializeGrid(this.state.gridSize),
    end: false
  });
};

HomeComponent.prototype.validateWinner = function (row, col) {
  if (this.validateRow(row, col)) return this.colurizeRow(row);
  if (this.validateColumn(row, col)) return this.colurizeColumn(col);

  if (row === col && this.validateLeftDiagonal())
    return this.colourizeLeftDiagonal();
  if (row + col === this.state.gridSize - 1 && this.validateRightDiagonal())
    return this.colourizeRightDiagonal();

  return false;
};

HomeComponent.prototype.validateRow = function (row, col) {
  const grid = this.state.grid;
  const gridSize = this.state.gridSize;

  let i = col - 1;
  let j = col + 1;

  while (i >= 0 || j < gridSize) {
    if (i >= 0 && grid[row][i--].val !== grid[row][col].val) return false;
    if (j < gridSize && grid[row][j++].val !== grid[row][col].val) return false;
  }
  return true;
};

HomeComponent.prototype.validateColumn = function (row, col) {
  const grid = this.state.grid;
  const gridSize = this.state.gridSize;

  let i = row - 1;
  let j = row + 1;

  //check Elements in Column
  while (i >= 0 || j < gridSize) {
    if (i >= 0 && grid[i--][col].val !== grid[row][col].val) return false;
    if (j < gridSize && grid[j++][col].val !== grid[row][col].val) return false;
  }

  return true;
};

HomeComponent.prototype.validateLeftDiagonal = function () {
  const grid = this.state.grid;
  const gridSize = this.state.gridSize;

  let row = 0;
  let col = 0;

  while (row < gridSize - 1) {
    if (grid[row][col].val !== grid[++row][++col].val) return false;
  }
  return true;
};

HomeComponent.prototype.validateRightDiagonal = function () {
  const grid = this.state.grid;
  const gridSize = this.state.gridSize;

  let row = 0;
  let col = gridSize - 1;

  while (row < gridSize - 1) {
    if (grid[row][col].val !== grid[++row][--col].val) return false;
  }
  return true;
};

HomeComponent.prototype.colourizeLeftDiagonal = function () {
  const grid = this.state.grid;
  const gridSize = this.state.gridSize;

  let row = 0;
  let col = 0;

  while (row < gridSize) {
    grid[row++][col++].isSelected = true;
  }
  return true;
};

HomeComponent.prototype.colourizeRightDiagonal = function () {
  const grid = this.state.grid;
  const gridSize = this.state.gridSize;

  let row = 0;
  let col = gridSize - 1;

  while (row < gridSize) {
    grid[row++][col--].isSelected = true;
  }
  return true;
};

HomeComponent.prototype.colurizeRow = function (row) {
  const grid = this.state.grid;
  const gridSize = this.state.gridSize;

  let col = 0;

  while (col < gridSize) {
    grid[row][col++].isSelected = true;
  }
  return true;
};

HomeComponent.prototype.colurizeColumn = function (col) {
  const grid = this.state.grid;
  const gridSize = this.state.gridSize;

  let row = 0;

  while (row < gridSize) {
    grid[row++][col].isSelected = true;
  }
  return true;
};

export default HomeComponent;
