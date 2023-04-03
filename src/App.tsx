import React, { useState } from 'react';
import './App.css';

import Grid, { Rule } from './automata/Grid';
import { ConwayLife } from './automata/rules/Conway/ConwayLife';
import { Caves0 } from './automata/rules/Caves/Caves0';
import GridController from './components/GridController/GridController';
import { UlamWarburton } from './automata/rules/Crystals/UlamWarburton';
import { UlamOopsies } from './automata/rules/Crystals/UlamOopsies';
import { Maze } from './automata/rules/Maze/Maze';
import HyperGrid, { RuleZone, WanderingZone } from './automata/HyperGrid';
import { Random0 } from './automata/rules/Random/Random0';
import { Random1 } from './automata/rules/Random/Random1';

function App() {
  const grid = new HyperGrid(Random1, 50); 

  // pretty presets :3
  grid.addWanderingZone(new WanderingZone(UlamWarburton, 5, 25, 25, 1, 20))
  grid.addWanderingZone(new WanderingZone(ConwayLife, 20, 25, 25, 1, 25))

  grid.setRunning(true);

  return (
    <div className="App">
      <GridController grid={grid}/>
    </div>
  );
}

export default App;
