import React, { useState } from 'react'
import Grid, { Rule } from '../../automata/Grid'
import HyperGrid from '../../automata/HyperGrid';
import { Caves0 } from '../../automata/rules/Caves/Caves0';
import { ConwayLife } from '../../automata/rules/Conway/ConwayLife';
import { UlamOopsies } from '../../automata/rules/Crystals/UlamOopsies';
import { UlamWarburton } from '../../automata/rules/Crystals/UlamWarburton';
import { Maze } from '../../automata/rules/Maze/Maze';
import { Random0 } from '../../automata/rules/Random/Random0';
import GridDisplay from '../GridDisplay/GridDisplay'
import PlayButton from '../PlayButton/PlayButton'
import RuleButton from '../RuleButton/RuleButton';

export default function GridController(props: { grid: HyperGrid }) {
    const [running, setRunning] = useState<boolean>(false);
    const [rule, setRule] = useState<Rule>(() => props.grid.rule);

    const handleSetRunning = (val: boolean) => {
        props.grid.setRunning(val);
        setRunning(val);
    }

    const handleChangeRule = (rule: Rule) => {
        props.grid.setRule(rule);
        setRule(() => rule);
    }

    return (
        <div>
            <GridDisplay grid={props.grid}/>
            <PlayButton running={running} setRunning={handleSetRunning} />
            <RuleButton text="caves" disabled={rule == Caves0} onClick={() => handleChangeRule(Caves0)} />
            <RuleButton text="life" disabled={rule == ConwayLife} onClick={() => handleChangeRule(ConwayLife)} />
            <RuleButton text="maze" disabled={rule == Maze} onClick={() => handleChangeRule(Maze)} />
            <RuleButton text="snowflake" disabled={rule == UlamWarburton} onClick={() => handleChangeRule(UlamWarburton)} />
            <RuleButton text="oopsies" disabled={rule == UlamOopsies} onClick={() => handleChangeRule(UlamOopsies)} />
            <RuleButton text="random" disabled={rule == Random0} onClick={() => handleChangeRule(Random0)} />
        </div>
    )
}