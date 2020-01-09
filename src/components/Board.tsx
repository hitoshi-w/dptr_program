import React from 'react'
import {BoardPropsInterface, SquarePropsInterface} from '../types'
import '../index.css'

function Square(props: SquarePropsInterface) {
  return(
    <button 
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  ) 
}

export class Board extends React.Component<BoardPropsInterface>{
  renderSquare(i: number) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}