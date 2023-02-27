import React, { useState } from 'react'
import '../../App.css';
import { Rule } from '../../automata/Grid';

export default function RuleButton(props: { text: string, disabled: boolean, onClick: () => void }) {
    const handleClick = () => {
        props.onClick();
    }
    return (
        <button disabled={props.disabled} className={props.disabled ? "DisabledRuleButton" : "Playbutton"} onClick={handleClick}>
            <p> { props.text } </p>
        </button>
    );
}
