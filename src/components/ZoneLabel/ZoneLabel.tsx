import React, { useState } from 'react'
import { getRuleText, RuleMap } from '../../automata/utils/rules';
import { WanderingZone } from '../../automata/HyperGrid';
import '../../App.css';

export default function ZoneLabel(props: { wzone: WanderingZone, onIncrease: (wzone: WanderingZone) => void, onDecrease: (wzone: WanderingZone) => void }) {
    const onIncreasePriority = () => {
        props.onIncrease(props.wzone);
    }

    const onLowerPriority = () => {
        props.onDecrease(props.wzone);
    }

    return (
        <div className="ZoneLabel">
            <p>{props.wzone.getPriority}</p>
            <p style={{ color:'orange' }}>{getRuleText(props.wzone.getRule)}</p>
            <p style={{ color:'grey' }}>Radius: {Math.round(props.wzone.getRadius)}</p>
            <p style={{ color:'grey' }}>Range: {Math.round(props.wzone.wanderRadius)}</p>
            <button className="UpButton" onClick={onIncreasePriority}>up</button>
            <button className="UpButton" onClick={onLowerPriority}>down</button>
        </div>
    );
}
