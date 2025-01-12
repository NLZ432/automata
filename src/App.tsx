import React from 'react';
import './App.css';

import { ConwayLife } from './automata/rules/Conway/ConwayLife';
import { UlamWarburton } from './automata/rules/Crystals/UlamWarburton';
import GridController from './components/GridController/GridController';
import HyperGrid, { WanderingZone } from './automata/HyperGrid';
import { Random1 } from './automata/rules/Random/Random1';

function App() {
  const grid = new HyperGrid(Random1, 50); 

  // pretty presets :3
  grid.addWanderingZone(new WanderingZone(UlamWarburton, 5, 25, 25, 2, 20))
  grid.addWanderingZone(new WanderingZone(ConwayLife, 20, 25, 25, 1, 25))

  grid.setRunning(true);

  return (
    <div className="App">
      <GridController grid={grid}/>
    </div>
  );
}

export default App;
