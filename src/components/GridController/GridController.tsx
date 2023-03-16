import React, { useRef, useState } from 'react'
import Grid, { Rule } from '../../automata/Grid'
import HyperGrid, { WanderingZone } from '../../automata/HyperGrid';
import { Caves0 } from '../../automata/rules/Caves/Caves0';
import { ConwayLife } from '../../automata/rules/Conway/ConwayLife';
import { UlamOopsies } from '../../automata/rules/Crystals/UlamOopsies';
import { UlamWarburton } from '../../automata/rules/Crystals/UlamWarburton';
import { Maze } from '../../automata/rules/Maze/Maze';
import { Random0 } from '../../automata/rules/Random/Random0';
import { Random1 } from '../../automata/rules/Random/Random1';
import GridDisplay from '../GridDisplay/GridDisplay'
import PlayButton from '../PlayButton/PlayButton'
import RuleButton from '../RuleButton/RuleButton';
import SpeedSlider from '../SpeedSlider/SpeedSlider';
import { distance } from '../../automata/utils/gridmath'
import RuleSelect from '../RuleSelect/RuleSelect';
import NewRuleButton from '../NewRuleButton/NewRuleButton';
import { rule_map } from '../../automata/utils/rules';
import ZoneLabel from '../ZoneLabel/ZoneLabel';
import ZoneList from '../ZoneList/ZoneList';

enum ControllerState {
  Normal = 0,
  AddRuleCenter = 1,
  AddRuleRadius = 2,
  AddRuleWanderRadius = 3,
}

export default function GridController(props: { grid: HyperGrid }) {
    const [running, setRunning] = useState<boolean>(props.grid.running);
    const [controllerState, setControllerState] = useState<ControllerState>(ControllerState.Normal);
    const [newZone, setNewZone] = useState<WanderingZone | null>(null);
    const [baseRule, setBaseRule] = useState<Rule>(() => props.grid.rule);

    //need to use refs because react state doesnt update in the functions below
    const stateRef = useRef(controllerState);
    const newZoneRef = useRef(newZone);
    stateRef.current = controllerState;
    newZoneRef.current = newZone;

    const handleSetRunning = (val: boolean) => {
        props.grid.setRunning(val);
        setRunning(val);
    }

    const changeInterval = (val: number) => {
       props.grid.setInterval(val);
    }

    const handleAddZone = () => {
        setControllerState(ControllerState.AddRuleCenter);
        //TODO add a more basic constructor for wandering zone and address priority
        setNewZone(new WanderingZone(ConwayLife, 0, 0, 0, props.grid.wanderingZones.length + 1, 0));
    }

    const onGridClick = (cellX: number, cellY: number): void => {
        console.log(controllerState);
        console.log(stateRef.current);
        console.log(newZone);
        if (stateRef.current == ControllerState.AddRuleCenter) {
            console.log("center");
            if (newZoneRef.current != null) {
                newZoneRef.current.start.x = cellX;
                newZoneRef.current.start.y = cellY;
            }
            setControllerState(ControllerState.AddRuleRadius)
        }
        else if (stateRef.current == ControllerState.AddRuleRadius) {
            console.log("radius");
            if (newZoneRef.current != null) {
                let radius = distance(newZoneRef.current.start.x, newZoneRef.current.start.y, cellX, cellY);
                newZoneRef.current.radius = radius;
            }
            setControllerState(ControllerState.AddRuleWanderRadius)
        }
        else if (stateRef.current == ControllerState.AddRuleWanderRadius) {
            console.log("wanderradius");
            if (newZoneRef.current != null) {
                let radius = distance(newZoneRef.current.start.x, newZoneRef.current.start.y, cellX, cellY);
                newZoneRef.current.wanderRadius = radius;
                props.grid.addWanderingZone(newZoneRef.current);
            }
            setControllerState(ControllerState.Normal)
            setNewZone(null);
        }
    }

    const handleSelectRule = (rule: Rule) => {
        if (newZoneRef.current != null) {
            newZoneRef.current.rule = rule;
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <GridDisplay grid={props.grid} newZone={newZone} onClick={onGridClick}/>
            <div style={{ 
                            padding: '20px',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                <PlayButton running={running} setRunning={handleSetRunning} />
                <SpeedSlider min={0} max={1000} setInterval={changeInterval} />
            </div>
            <ZoneList wzones={props.grid.wanderingZones} />
            <div>
                { controllerState == ControllerState.Normal && <NewRuleButton onClick={handleAddZone}/> }
                { controllerState != ControllerState.Normal && <RuleSelect rules={rule_map} default="ConwayLife" onSelect={handleSelectRule}/> }
            </div>
        </div>
    )
}