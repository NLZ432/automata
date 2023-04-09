import React, { useEffect, useId, useRef } from 'react'
import p5 from 'p5'
import Grid, { Rule } from '../../automata/Grid';
import HyperGrid, { RuleZone, WanderingZone } from '../../automata/HyperGrid';
import { Maze } from '../../automata/rules/Maze/Maze';
import { ConwayLife } from '../../automata/rules/Conway/ConwayLife';
import { UlamWarburton } from '../../automata/rules/Crystals/UlamWarburton';
import { Random1 } from '../../automata/rules/Random/Random1';
import { distance } from '../../automata/utils/gridmath';

function calculateSizes(windowWidth: number, windowHeight: number, gridSize: number): { cellSize: number, canvasSize: number } {
    let canvasScale: number = 0.8; // fraction of window size
    let canvasSize: number = Math.floor(Math.min(windowWidth, windowHeight) * canvasScale);
    
    let cellSize: number = Math.floor(canvasSize / gridSize);
    
    // adjust canvas to be multiple of cell size
    canvasSize = cellSize * gridSize;

    return { cellSize: cellSize, canvasSize: canvasSize }; 
}

export default function GridDisplay(props: { grid: HyperGrid, newZone: WanderingZone | null, onClick: (cellX: number, cellY: number) => void }) {
    const newZoneRef = useRef(props.newZone);
    newZoneRef.current = props.newZone;
    const Sketch = (sketch: p5) => {
        let cursorZone: RuleZone;
        let canvasSize: number; 
        let cellSize: number;
        
        sketch.setup = () => {
            let sizes = calculateSizes(sketch.windowWidth, sketch.windowHeight, props.grid.size);
            canvasSize = sizes.canvasSize;
            cellSize = sizes.cellSize; 
            sketch.createCanvas(canvasSize, canvasSize);
        };

        sketch.draw = () => {
            sketch.background(0);
            for (let i = 0; i < props.grid.size; i++) {
                for (let j = 0; j < props.grid.size; j++) {
                    const x = i * cellSize;
                    const y = j * cellSize;
                    
                    let cellValue = props.grid.getCell(i, j);
                    sketch.fill(cellValue ? 0 : 0);
                    sketch.stroke(cellValue ? 255 : 0);

                    if (cellValue) {
                        let rule = props.grid.calculateDominantRule(i, j);
                        // if (rule == ConwayLife) {
                        //     sketch.stroke(sketch.color('red'));
                        // }
                        if (rule == Random1) {
                            sketch.stroke(sketch.color('teal'));
                        }
                    }

                    const gx = x + cellSize * 0.1;
                    const gy = y + cellSize * 0.1;
                    sketch.rect(gx, gy, cellSize * 0.8, cellSize * 0.8);
                }
            }

            // if (sketch.mouseX > 0 && sketch.mouseX < canvasSize && sketch.mouseY > 0 && sketch.mouseY < canvasSize) {
            //     const x = Math.floor((sketch.mouseX / canvasSize) * props.grid.size);
            //     const y = Math.floor((sketch.mouseY / canvasSize) * props.grid.size);
               
            //     cursorZone.radius = 10;
            //     cursorZone.x = x;
            //     cursorZone.y = y;
            // }
            // else {
            //     cursorZone.radius = 0;
            // }

            // draw radii when adding a new zone
            if (newZoneRef.current != null) {
                if (newZoneRef.current.radius != 0) { // setting wandering zone
                    let wander_radius = distance(newZoneRef.current.start.x * cellSize,
                                    newZoneRef.current.start.y * cellSize, 
                                    sketch.mouseX,
                                    sketch.mouseY);
                    sketch.stroke('red');
                    sketch.drawingContext.setLineDash([10, 5]);
                    sketch.circle(newZoneRef.current.start.x * cellSize, newZoneRef.current.start.y * cellSize, wander_radius * 2)
                    sketch.drawingContext.setLineDash([]);

                    sketch.stroke('red');
                    sketch.circle(newZoneRef.current.start.x * cellSize, newZoneRef.current.start.y * cellSize, newZoneRef.current.radius * cellSize * 2)
                }
                else if (newZoneRef.current.start.x != 0) { // setting radius
                    let radius = distance(newZoneRef.current.start.x * cellSize,
                                    newZoneRef.current.start.y * cellSize, 
                                    sketch.mouseX,
                                    sketch.mouseY);
                    sketch.stroke('red');
                    sketch.circle(newZoneRef.current.start.x * cellSize, newZoneRef.current.start.y * cellSize, radius * 2)
                }
            }
        };

        sketch.windowResized = () => {
            let sizes = calculateSizes(sketch.windowWidth, sketch.windowHeight, props.grid.size);
            canvasSize = sizes.canvasSize;
            cellSize = sizes.cellSize; 
            sketch.resizeCanvas(canvasSize, canvasSize);
        }

        sketch.mouseClicked = () => {
            const x = Math.floor((sketch.mouseX / canvasSize) * props.grid.size);
            const y = Math.floor((sketch.mouseY / canvasSize) * props.grid.size);
            if (x >= 0 && x < props.grid.size && y >= 0 && y < props.grid.size)
            {
                props.grid.setCell(x, y, true);
                props.onClick(x, y);
                // props.grid.update();
            }
        }
        
        // on mouse hovered in range of canvas
        sketch.mouseMoved = () => {
            const x = Math.floor((sketch.mouseX / canvasSize) * props.grid.size);
            const y = Math.floor((sketch.mouseY / canvasSize) * props.grid.size);
            if (x >= 0 && x < props.grid.size && y >= 0 && y < props.grid.size)
            {
                props.grid.getCursorZone().radius = 10;
                props.grid.getCursorZone().x = x;
                props.grid.getCursorZone().y = y;
            }
            else {
                props.grid.getCursorZone().radius = 0;
            }
        }


    }

    const myRef: any = React.createRef()
    useEffect(() => {
        const view = new p5(Sketch, myRef.current);
		return view.remove; // This removes the duplicate canvas when the component is rerendered.
  	}, []);
  
    return (<div className="CanvasContainer" ref={myRef}></div>)
}
