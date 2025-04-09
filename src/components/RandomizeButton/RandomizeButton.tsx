import React from 'react'
import '../../App.css';

export default function RandomizeButton(props: { onClick: () => void }) {
    const handleClick = () => {
        props.onClick();
    }
    return (
        <button className="Playbutton" onClick={handleClick}>
            <p> Randomize </p>
        </button>
    );
} 