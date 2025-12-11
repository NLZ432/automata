import React, { useState } from 'react'
import '../../App.css';

export default function PlayButton(props: { running: boolean, setRunning: (val: boolean) => void }) {
    const handleClick = () => {
        props.setRunning(!props.running);
    }
    return (
        <button className="Playbutton" onClick={handleClick}>
            <p> { props.running ? "Pause" : "Play" } </p>
        </button>
    );
}