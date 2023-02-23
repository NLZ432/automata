import React from 'react';
import './App.css';

import GridDisplay from './components/GridDisplay/GridDisplay';
import Grid, { Rule } from './automata/Grid';
import { ConwayLife } from './automata/rules/ConwayLife';

function App() {

  const rule: Rule = (grid, x, y) => {
    // return grid.getCell(x,y);
    return true;
  }

  const grid = new Grid(ConwayLife); 

  let on = false;
  const updateRoutine = () => {
    if (on) {
      setTimeout(() => {
        grid.update();
        updateRoutine(); 
      }, 200)
    }
  }

  const handleClick = () => {
    on = !on;
    if (on) {
      updateRoutine();
    }
  }

  return (
    <div className="App">
      <GridDisplay grid={grid}/>
      <button onClick={handleClick}>
        <p> click </p>
      </button>
    </div>
  );
}

export default App;
