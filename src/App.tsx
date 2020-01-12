import React from 'react';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <Game
        history={[
          {
            squares: Array(9).fill('')
          }
        ]}
        xIsNext={true}
      />
    </div>
  );
};

export default App;