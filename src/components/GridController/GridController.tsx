import React, { useState } from 'react'
import Grid, { Rule } from '../../automata/Grid'
import HyperGrid from '../../automata/HyperGrid';
import { Caves0 } from '../../automata/rules/Caves/Caves0';
import { ConwayLife } from '../../automata/rules/Conway/ConwayLife';
import { UlamOopsies } from '../../automata/rules/Crystals/UlamOopsies';
import { UlamWarburton } from '../../automata/rules/Crystals/UlamWarburton';
import { Maze } from '../../automata/rules/Maze/Maze';
import { Random0 } from '../../automata/rules/Random/Random0';
import { Random1 } from '../../automata/rules/Random/Random1';
import GridDisplay from '../GridDisplay/GridDisplay'
import PlayButton from '../PlayButton/PlayButton'
import RuleButton from '../RuleButton/RuleButton';
import SpeedSlider from '../SpeedSlider/SpeedSlider';

export default function GridController(props: { grid: HyperGrid }) {
    const [running, setRunning] = useState<boolean>(props.grid.running);
    const [rule, setRule] = useState<Rule>(() => props.grid.rule);

    const handleSetRunning = (val: boolean) => {
        props.grid.setRunning(val);
        setRunning(val);
    }

    const changeInterval = (val: number) => {
       props.grid.setInterval(val);
    }

    const handleChangeRule = (rule: Rule) => {
        props.grid.setRule(rule);
        setRule(() => rule);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <GridDisplay grid={props.grid}/>
            <div style={{ 
                            padding: '20px',
                            display: 'flex',
                            gap: '10px' 
                        }}>
                <RuleButton text="caves" disabled={rule == Caves0} onClick={() => handleChangeRule(Caves0)} />
                <RuleButton text="life" disabled={rule == ConwayLife} onClick={() => handleChangeRule(ConwayLife)} />
                <RuleButton text="maze" disabled={rule == Maze} onClick={() => handleChangeRule(Maze)} />
                <RuleButton text="snowflake" disabled={rule == UlamWarburton} onClick={() => handleChangeRule(UlamWarburton)} />
                <RuleButton text="oopsies" disabled={rule == UlamOopsies} onClick={() => handleChangeRule(UlamOopsies)} />
                <RuleButton text="random" disabled={rule == Random1} onClick={() => handleChangeRule(Random1)} />
            </div>
            <div style={{ 
                            padding: '20px',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                <PlayButton running={running} setRunning={handleSetRunning} />
                <SpeedSlider min={0} max={1000} setInterval={changeInterval} />
            </div>
        </div>
    )
}