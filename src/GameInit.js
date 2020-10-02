import React from 'react';
import './Game/index.css';
//import App from './App';
import Game from './Game';

class GameInit extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            boardSize: 5
        }
    }

    handleChange = (e) => {
        const val = e.target.value;
        this.setState({
            boardSize: val === '' ? val : parseInt(val)
        });
    }

    render() {
    //const game = [<input placeholder={"Board Size"} onChange = {(e) => this.handleKeyPress(e)} />, <br style={{margin: '10px'}} />];
        return (
            <div>
                <label>Board Size: </label>
                <input type="text" value={this.state.boardSize} placeholder={"Board Size"} onChange = {this.handleChange} />
                <br style={{margin: '10px'}} />
                {this.state.boardSize !== '' && <Game boardSize={this.state.boardSize} />}
            </div>
        );
    }
}

export default GameInit;