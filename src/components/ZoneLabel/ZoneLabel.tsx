import React, { useState } from 'react'
import { getRuleText, rule_map, RuleMap } from '../../automata/utils/rules';
import { WanderingZone } from '../../automata/HyperGrid';
import '../../App.css';
import RuleSelect from '../RuleSelect/RuleSelect';
import { Rule } from '../../automata/Grid';
import { IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ZoneLabel(props: { wzone: WanderingZone, onIncrease: (wzone: WanderingZone) => void, onDecrease: (wzone: WanderingZone) => void, onDelete: (wzone: WanderingZone) => void}) {
    const onIncreasePriority = () => {
        props.onIncrease(props.wzone);
    }

    const onLowerPriority = () => {
        props.onDecrease(props.wzone);
    }

    const onDelete = () => {
        props.onDelete(props.wzone);
    }

    const handleChangeRule = (rule: Rule) => {
        props.wzone.rule = rule;
    }

    return (
        <div className="ZoneLabel">
            <p>{props.wzone.getPriority}</p>
            {/* <p style={{ color:'teal' }}>{getRuleText(props.wzone.getRule)}</p> */}
            <RuleSelect rules={rule_map} default={getRuleText(props.wzone.getRule)} onSelect={handleChangeRule}/>
            <p style={{ color:'grey' }}>Radius: {Math.round(props.wzone.getRadius)}</p>
            <p style={{ color:'grey' }}>Range: {Math.round(props.wzone.wanderRadius)}</p>
            <IconButton color="primary" onClick={onIncreasePriority}>
                <KeyboardArrowDownIcon />
            </IconButton>
            <IconButton color="primary" onClick={onLowerPriority}>
                <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton color="primary" onClick={onDelete}>
                <DeleteIcon /> 
            </IconButton>
        </div>
    );
}
