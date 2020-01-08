import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

interface SquarePropsInterface {
  value: string
  onClick: () => void
}

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

interface BoardPropsInterface {
  squares: Array<string>
  xIsNext: boolean
}

interface BoardStateInterface {
  squares: Array<string>
  xIsNext: boolean
}

class Board extends React.Component<BoardPropsInterface, BoardStateInterface>{
  constructor(props: BoardPropsInterface) {
    super(props)
    this.state = {
      squares: Array(9).fill(""),
      xIsNext: true,
    }
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }

  renderSquare(i: number) {
    return <Square 
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
    />
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')

    return (
      <div>
        <div className="status">{status}</div>
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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={Array(9).fill("")} 
            xIsNext={true}
          />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    )
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)