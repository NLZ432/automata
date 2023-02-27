import React, { useEffect, useId } from 'react'
import p5 from 'p5'
import Grid from '../../automata/Grid';
import HyperGrid, { RuleZone } from '../../automata/HyperGrid';
import { Maze } from '../../automata/rules/Maze/Maze';
import { ConwayLife } from '../../automata/rules/Conway/ConwayLife';

function calculateSizes(windowWidth: number, windowHeight: number, gridSize: number): { cellSize: number, canvasSize: number } {
    let canvasScale: number = 0.8; // fraction of window size
    let canvasSize: number = Math.floor(Math.min(windowWidth, windowHeight) * canvasScale);
    
    let cellSize: number = Math.floor(canvasSize / gridSize);
    
    // adjust canvas to be multiple of cell size
    canvasSize = cellSize * gridSize;

    return { cellSize: cellSize, canvasSize: canvasSize }; 
}

export default function GridDisplay(props: { grid: HyperGrid }) {
    const Sketch = (sketch: p5) => {
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
                    
                    var cellValue = props.grid.getCell(i, j);
                    sketch.fill(cellValue ? 255 : 0);
                    sketch.stroke(100);

                    const gx = x + cellSize * 0.1;
                    const gy = y + cellSize * 0.1;
                    sketch.rect(gx, gy, cellSize * 0.8, cellSize * 0.8);
                }
            }

            if (sketch.mouseX > 0 && sketch.mouseX < canvasSize && sketch.mouseY > 0 && sketch.mouseY < canvasSize) {
                const x = Math.floor((sketch.mouseX / canvasSize) * props.grid.size);
                const y = Math.floor((sketch.mouseY / canvasSize) * props.grid.size);
                
                if (props.grid.zones.length == 0) {
                    props.grid.zones.push(new RuleZone(Maze, 10, x, y));
                }
                props.grid.zones[0].x = x;
                props.grid.zones[0].y = y;
            }
            else {
                if (props.grid.zones.length > 0) {
                    props.grid.zones = [];
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
                // props.grid.update();
            }
        }
    }

    const myRef: any = React.createRef()
    useEffect(() => {
        const view = new p5(Sketch, myRef.current);
		return view.remove; // This removes the duplicate canvas when the component is rerendered.
  	}, []);
  
    return (<div ref={myRef}></div>)
}
