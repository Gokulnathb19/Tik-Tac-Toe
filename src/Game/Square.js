import React from 'react';

function Square(props) {
    const buttonStyle = {
        color: props.color
    }
    return (
      <button style={buttonStyle} className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  export default Square;