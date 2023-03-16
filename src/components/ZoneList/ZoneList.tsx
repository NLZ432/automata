import React, { useState } from 'react'
import '../../App.css';
import { Rule } from '../../automata/Grid';
import { WanderingZone } from '../../automata/HyperGrid';
import ZoneLabel from '../ZoneLabel/ZoneLabel';

export default function ZoneList(props: { wzones: Array<WanderingZone> }) {
    const [state, setState] = useState<boolean>(true);

    const onPriorityIncrease = (wzone: WanderingZone) => {
        const zoneToReplace = props.wzones.find((w) => w.priority === wzone.priority + 1)
        if (zoneToReplace) {
            zoneToReplace.priority = wzone.priority;
            wzone.priority = wzone.priority + 1;
            setState(!state);
        }
    }

    const onPriorityDecrease = (wzone: WanderingZone) => {
        const zoneToReplace = props.wzones.find((w) => w.priority === wzone.priority - 1)
        if (zoneToReplace) {
            zoneToReplace.priority = wzone.priority;
            wzone.priority = wzone.priority - 1;
            setState(!state);
        }
    }

    return (
        <div>
            { props.wzones.sort((a, b) => a.priority - b.priority).map((wzone, index) => (
                <ZoneLabel key={index} wzone={wzone} onIncrease={onPriorityIncrease} onDecrease={onPriorityDecrease} />
            ))}
        </div>
    );
}
