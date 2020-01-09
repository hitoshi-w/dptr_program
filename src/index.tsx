import React from 'react'
import ReactDOM from 'react-dom'
import {Game} from './components/Game'

ReactDOM.render(
  <Game 
    history={[
      {
      squares: Array(9).fill("")
      }
    ]}
    xIsNext={true}
  />,
  document.getElementById('root')
)