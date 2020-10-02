import React from 'react';
import Board from './Board';

function getWiningLines(size){
    let lines = [[]];
    for(let i=0; i<size;i++){
        let temp = [];
        let tSize = size * (i+1);
        let initJ = size * i;
        for(let j=initJ; j<tSize; j++){
            temp.push(j);
        }
        lines.push(temp);
    }
    for(let i=0; i<size;i++){
        let temp = [];
        for(let j=i; j<size*size; j=j+size){
            temp.push(j);
        }
        lines.push(temp);
    }
    let temp = [];
    for(let i=0; i<size*size; i=i+size+1){
        temp.push(i);
    }
    lines.push(temp);
    temp = [];
    for(let i=size-1,j=0; j<size; i=i+size-1, j++){
        temp.push(i);
    }
    lines.push(temp);
    //console.log(lines);
    return lines;
}

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(this.props.boardSize * this.props.boardSize).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        highlightNumber: null,
        winningLines: [],
        reRender: true,
        isAsc: true
      };
      //this.winningLines = [];
      this.boardSize = this.props.boardSize;
    }

    getLocation(move){
      return '(row: ' + String(Math.floor(move/this.boardSize)+1) + ', col: ' + String(((move%this.boardSize)+1) + ')');
    }

    calculateWinner(squares) {
        const lines = getWiningLines(this.boardSize);
        for (let i = 0; i < lines.length; i++) {
          const a = lines[i][0];
          let flag = false;
          if(squares[a]){
            for(let j=1; j<this.boardSize; j++){
                let b = lines[i][j];
                if (squares[a] === squares[b] ) {
                    flag = true;
                }
                else{
                    flag = false;
                    break;
                }
            }
          }
          if (flag) {
            //console.log([squares[a], lines[i]]);
            return [squares[a], lines[i]];
          }
        }
        return null;
      }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      let winner = this.calculateWinner(squares);
      if (winner || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
            loc: this.getLocation(i)
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        reRender: true
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        highlightNumber: step,
        xIsNext: (step % 2) === 0
      });
    }

    componentDidUpdate(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        if(winner && this.state.reRender) {
            this.setState({
                winningLines: winner[1],
                reRender: false
            });
          }
    }

    toggleOrder(){
        const isAscending = this.state.isAsc;
        this.setState({
            isAsc: isAscending ? false : true
        })
    }

    reStartGame(){
      this.setState({
        history: [
          {
            squares: Array(this.boardSize * this.boardSize).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        highlightNumber: null,
        winningLines: [],
        reRender: true,
        isAsc: true
      });
    }
  
    render() {
        const toggle = (
            <button onClick={() => this.toggleOrder()}>Toggle History</button>
          );
        const reStart = (
          <button onClick={() => this.reStartGame()}>Restart Game</button>
        );
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = this.calculateWinner(current.squares);
        
      const moves = history.map((step, move) => {
        let desc = move ?
          'Go to move #' + move :
          'Go to game start';
        desc = move=== this.state.highlightNumber ? (<b>{desc}</b>) : desc;
        let loc = move ? step.loc : '';
        loc = move=== this.state.highlightNumber ? (<b>{loc}</b>) : loc;
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc} {loc}</button>
          </li>
        );
      });

      if(!this.state.isAsc)
        moves.reverse();
  
      let status;
      if (winner) {
        status = "Winner: " + winner[0];
      } else if (this.state.stepNumber === Math.pow(this.boardSize, 2)) {
          status = "Draw: X=O"
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              winningLines={winner ? this.state.winningLines : []}
              squares={current.squares}
              onClick={i => this.handleClick(i)}
              boardSize={this.props.boardSize}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            {toggle}
            {reStart}
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  export default Game;