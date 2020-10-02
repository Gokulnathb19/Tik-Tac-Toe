import React from 'react';
import Square from './Square';

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          color={this.props.winningLines.includes(i) ? 'red' : 'black'}
          key={i}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }

    renderSquares(boardSize){
        const colSize = Math.sqrt(boardSize);
        let rowSquares = [];
        for(let i=0; i<boardSize; i= i+colSize){
           rowSquares.push(
                (<div key={i} className="board-row">
                    {this.renderColSquares(colSize, i)}
                </div>)
           );
        //this.renderSquare(i);
        }

        return(
            rowSquares
        );
    }

    renderColSquares(colSize, startSize){
        let colSquares = [];
        for(let i=startSize; i<startSize+colSize; i= i+1){
            colSquares.push(this.renderSquare(i));
        //this.renderSquare(i);
        }
        return(
            colSquares
        );
    }
  
    render() {
      return (
        <div>
          {this.renderSquares(this.props.boardSize*this.props.boardSize)}
        </div>
      );
    }
  }

  export default Board;