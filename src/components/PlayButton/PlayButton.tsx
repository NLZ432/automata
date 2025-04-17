import React from 'react'
import '../../App.css';

export default function PlayButton(props: { running: boolean, setRunning: (val: boolean) => void }) {
    const handleClick = () => {
        props.setRunning(!props.running);
    }
    return (
        <button className="Playbutton" onClick={handleClick} style={{minWidth: '80px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <p style={{margin: 0}}>{ props.running ? "Pause" : "Play" }</p>
        </button>
    );
}