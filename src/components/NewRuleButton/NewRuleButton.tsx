import React, { useState } from 'react'
import '../../App.css';

export default function NewRuleButton(props: { onClick: () => void }) {
    const handleClick = () => {
        props.onClick();
    }
    return (
        <button className="Playbutton" onClick={handleClick}>
            <p> New Rule </p>
        </button>
    );
}
