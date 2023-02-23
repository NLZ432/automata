import React, { useEffect, useId } from 'react'
import p5 from 'p5'
import Grid from '../../automata/Grid';

function calculateSizes(windowWidth: number, windowHeight: number, gridSize: number): { cellSize: number, canvasSize: number } {
    let canvasScale: number = 0.8; // fraction of window size
    let canvasSize: number = Math.floor(Math.min(windowWidth, windowHeight) * canvasScale);
    
    let cellSize: number = Math.floor(canvasSize / gridSize);
    
    // adjust canvas to be multiple of cell size
    canvasSize = cellSize * gridSize;

    return { cellSize: cellSize, canvasSize: canvasSize }; 
}

export default function GridDisplay(props: {}) {
    let grid: Grid = new Grid();

    const Sketch = (sketch: p5) => {
        var cellSize: number;
        
        sketch.setup = () => {
            let sizes = calculateSizes(sketch.windowWidth, sketch.windowHeight, grid.size);
            cellSize = sizes.cellSize; 
            sketch.createCanvas(sizes.canvasSize, sizes.canvasSize);
        };

        sketch.draw = () => {
            sketch.background(0);
            sketch.fill(255);

            for (let i = 0; i < grid.size; i++) {
                for (let j = 0; j < grid.size; j++) {
                    const x = i * cellSize;
                    const y = j * cellSize;
                    
                    var cellValue = grid.getCell(i, j);
                    sketch.fill(cellValue ? 255 : 0);
                    sketch.stroke(255);

                    const gx = x + cellSize * 0.2;
                    const gy = y + cellSize * 0.2;
                    sketch.rect(gx, gy, cellSize * 0.6, cellSize * 0.6);
                }
            }
        };

        sketch.windowResized = () => {
            let sizes = calculateSizes(sketch.windowWidth, sketch.windowHeight, grid.size);
            cellSize = sizes.cellSize; 
            sketch.resizeCanvas(sizes.canvasSize, sizes.canvasSize);
        }

        sketch.mouseClicked = () => {
            grid.update();
        }
    }

    const myRef: any = React.createRef()
    useEffect(() => {
        const view = new p5(Sketch, myRef.current);
		return view.remove; // This removes the duplicate canvas when the component is rerendered.
  	}, []);
  
    return (<div ref={myRef}></div>)
}
