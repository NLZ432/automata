import React, { useState } from 'react';
import './App.css';

import Grid, { Rule } from './automata/Grid';
import { ConwayLife } from './automata/rules/Conway/ConwayLife';
import { Caves0 } from './automata/rules/Caves/Caves0';
import GridController from './components/GridController/GridController';
import { UlamWarburton } from './automata/rules/Crystals/UlamWarburton';
import { UlamOopsies } from './automata/rules/Crystals/UlamOopsies';

function App() {
  const grid = new Grid(UlamOopsies); 

  return (
    <div className="App">
      <GridController grid={grid}/>
    </div>
  );
}

export default App;
