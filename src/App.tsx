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
  let z = new RuleZone(Maze, 14, grid.size / 2, grid.size / 2, 1);
  let w = new WanderingZone(ConwayLife, 5, grid.size / 2, grid.size / 2, 2, 20);
  grid.addZone(z);
  grid.addWanderingZone(w);

  return (
    <div className="App">
      <GridController grid={grid}/>
    </div>
  );
}

export default App;
