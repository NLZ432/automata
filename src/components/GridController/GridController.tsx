import React, { useState } from 'react'
import Grid from '../../automata/Grid'
import GridDisplay from '../GridDisplay/GridDisplay'
import PlayButton from '../PlayButton/PlayButton'

export default function GridController(props: { grid: Grid }) {
    const [running, setRunning] = useState<boolean>(false);

    const updateRoutine = () => {
        if (props.grid.running) {
            setTimeout(() => {
                if (props.grid.running) props.grid.update();
                updateRoutine(); 
            }, 200)
        }
    }

    props.grid.running = running;
    if (props.grid.running) {
        updateRoutine();
    }

    return (
        <div>
            <GridDisplay grid={props.grid}/>
            <PlayButton running={running} setRunning={setRunning} />
        </div>
    )
}