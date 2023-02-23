import React, { useState } from 'react'
import Grid from '../../automata/Grid'
import GridDisplay from '../GridDisplay/GridDisplay'
import PlayButton from '../PlayButton/PlayButton'

export default function GridController(props: { grid: Grid }) {
    const [running, setRunning] = useState<boolean>(false);
    const handleSetRunning = (val: boolean) => {
        props.grid.setRunning(val);
        setRunning(val);
    }

    return (
        <div>
            <GridDisplay grid={props.grid}/>
            <PlayButton running={running} setRunning={handleSetRunning} />
        </div>
    )
}