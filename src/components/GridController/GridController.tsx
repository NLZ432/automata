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
import { getRuleText, rule_map } from '../../automata/utils/rules';
import ZoneLabel from '../ZoneLabel/ZoneLabel';
import ZoneList from '../ZoneList/ZoneList';
import ClearButton from '../ClearButton/ClearButton';
import ExampleSelect from '../ExampleSelect/ExampleSelect';
import RandomizeButton from '../RandomizeButton/RandomizeButton';
import { Example } from '../../automata/examples';

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
    const [speed, setSpeed] = useState<number>(props.grid.updateInterval);

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
       setSpeed(val);
    }

    const handleAddZone = () => {
        setControllerState(ControllerState.AddRuleCenter);
        //TODO add a more basic constructor for wandering zone and address priority
        setNewZone(new WanderingZone(ConwayLife, 0, 0, 0, props.grid.wanderingZones.length + 1, 0));
    }

    const onGridClick = (cellX: number, cellY: number): void => {
        if (stateRef.current == ControllerState.AddRuleCenter) {
            if (newZoneRef.current != null) {
                newZoneRef.current.start.x = cellX;
                newZoneRef.current.start.y = cellY;
            }
            setControllerState(ControllerState.AddRuleRadius)
        }
        else if (stateRef.current == ControllerState.AddRuleRadius) {
            if (newZoneRef.current != null) {
                let radius = distance(newZoneRef.current.start.x, newZoneRef.current.start.y, cellX, cellY);
                newZoneRef.current.radius = radius;
            }
            setControllerState(ControllerState.AddRuleWanderRadius)
        }
        else if (stateRef.current == ControllerState.AddRuleWanderRadius) {
            if (newZoneRef.current != null) {
                let radius = distance(newZoneRef.current.start.x, newZoneRef.current.start.y, cellX, cellY);
                newZoneRef.current.wanderRadius = radius;
                props.grid.addWanderingZone(newZoneRef.current);
            }
            setControllerState(ControllerState.Normal)
            setNewZone(null);
        }
    }

    const handleChangeBaseRule = (rule: Rule) => {
        props.grid.setRule(rule);
        setBaseRule(() => rule);
        // Force re-render to update UI
        setControllerState(prev => prev);
    }

    const handleSelectRule = (rule: Rule) => {
        if (newZoneRef.current != null) {
            newZoneRef.current.rule = rule;
            // Force re-render to update UI
            setControllerState(prev => prev);
        }
    }

    const handleChangeCursorRule = (rule: Rule) => {
        props.grid.getCursorZone().rule = rule;
        // Force re-render to update UI
        setControllerState(prev => prev);
    }

    const handleClearGrid = () => {
        props.grid.clear();
    }

    const handleLoadExample = (example: Example) => {
        // Stop any running simulation
        if (running) {
            handleSetRunning(false);
        }

        // Clear existing state
        props.grid.clear();
        
        // Clear all zones except cursor zone
        props.grid.wanderingZones = [];
        props.grid.zones = [props.grid.getCursorZone()];  // Reset zones array to only contain cursor zone

        // Set up new state
        props.grid.setRule(example.baseRule);
        setBaseRule(() => example.baseRule);  // Update the base rule state for UI
        
        // Update cursor rule
        props.grid.getCursorZone().rule = example.cursorRule;
        
        // Update speed if specified in the example
        if (example.speed !== undefined) {
            props.grid.setInterval(example.speed);
            setSpeed(example.speed);
        }
        
        // Add wandering zones
        example.wanderingZones.forEach(zone => {
            props.grid.addWanderingZone(zone);
        });

        // Set initial state
        const initialState = example.initialState(props.grid.size);
        for (let i = 0; i < props.grid.size; i++) {
            for (let j = 0; j < props.grid.size; j++) {
                props.grid.setCell(i, j, initialState[i][j]);
            }
        }

        // Force a re-render of the component to update the rule selectors
        setControllerState(prev => prev);
    }

    const handleRandomize = () => {
        // Stop any running simulation
        if (running) {
            handleSetRunning(false);
        }

        // Clear existing state
        props.grid.clear();
        
        // Clear all zones except cursor zone
        props.grid.wanderingZones = [];
        props.grid.zones = [props.grid.getCursorZone()];

        // Get all available rules
        const rules = Object.values(rule_map);
        
        // Create 3-5 random wandering zones
        const numZones = Math.floor(Math.random() * 3) + 3; // Random number between 3 and 5
        
        for (let i = 0; i < numZones; i++) {
            const randomRule = rules[Math.floor(Math.random() * rules.length)];
            const radius = Math.floor(Math.random() * 15) + 5; // Random radius between 5 and 20
            const x = Math.floor(Math.random() * (props.grid.size - 20)) + 10; // Random x between 10 and size-10
            const y = Math.floor(Math.random() * (props.grid.size - 20)) + 10; // Random y between 10 and size-10
            const wanderRadius = Math.floor(Math.random() * 15) + 10; // Random wander radius between 10 and 25
            
            const newZone = new WanderingZone(randomRule, radius, x, y, i + 1, wanderRadius);
            props.grid.addWanderingZone(newZone);
        }

        // Set a random base rule
        const randomBaseRule = rules[Math.floor(Math.random() * rules.length)];
        props.grid.setRule(randomBaseRule);
        setBaseRule(() => randomBaseRule);

        // Set a random cursor rule
        const randomCursorRule = rules[Math.floor(Math.random() * rules.length)];
        props.grid.getCursorZone().rule = randomCursorRule;

        // Set a random speed between 50 and 200
        const randomSpeed = Math.floor(Math.random() * 150) + 50;
        props.grid.setInterval(randomSpeed);
        setSpeed(randomSpeed);

        // Set random cells alive (about 20% of the grid)
        const numCellsToActivate = Math.floor(props.grid.size * props.grid.size * 0.2);
        for (let i = 0; i < numCellsToActivate; i++) {
            const x = Math.floor(Math.random() * props.grid.size);
            const y = Math.floor(Math.random() * props.grid.size);
            props.grid.setCell(x, y, true);
        }

        // Start the simulation
        handleSetRunning(true);

        // Force a re-render
        setControllerState(prev => prev);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '25px', alignItems: ''}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <GridDisplay grid={props.grid} newZone={newZone} onClick={onGridClick}/>
                { controllerState != ControllerState.Normal && <p style={{color: 'white'}}>Click the grid three times to define the location, radius, and range of the rule.</p> }
                <div style={{ 
                                padding: '20px',
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center'
                            }}>
                    <PlayButton running={running} setRunning={handleSetRunning} />
                    <SpeedSlider min={0} max={1000} setInterval={changeInterval} value={speed} />
                    <RuleSelect 
                        key={`base-rule-${getRuleText(props.grid.rule)}`}
                        rules={rule_map} 
                        default={getRuleText(props.grid.rule)} 
                        onSelect={handleChangeBaseRule}
                    />
                    <ClearButton onClick={handleClearGrid} />
                    <RandomizeButton onClick={handleRandomize} />
                    { controllerState == ControllerState.Normal && <NewRuleButton onClick={handleAddZone}/> }
                </div>
                <div style={{ 
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center'
                            }}>
                    <p>{"Cursor rule: "}</p>
                    <RuleSelect 
                        key={`cursor-rule-${getRuleText(props.grid.getCursorZone().rule)}`}
                        rules={rule_map} 
                        default={getRuleText(props.grid.getCursorZone().rule)} 
                        onSelect={handleChangeCursorRule}
                    />
                </div>
                <div style={{ 
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                marginTop: '10px'
                            }}>
                    <ExampleSelect grid={props.grid} onSelect={handleLoadExample} />
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <ZoneList wzones={props.grid.wanderingZones} />
                { controllerState != ControllerState.Normal && 
                    <RuleSelect 
                        key={`new-zone-rule-${newZone ? getRuleText(newZone.rule) : 'default'}`}
                        rules={rule_map} 
                        default="ConwayLife" 
                        onSelect={handleSelectRule}
                    /> 
                }
            </div>
        </div>
    )
}