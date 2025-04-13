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

// Function to generate a random base color
function getRandomBaseColor(sketch: p5): p5.Color {
    // Neon color palette
    const neonColors = [
        sketch.color(255, 0, 128),   // Neon pink
        sketch.color(0, 255, 255),   // Neon cyan
        sketch.color(255, 255, 0),   // Neon yellow
        sketch.color(0, 255, 0),     // Neon green
        sketch.color(255, 0, 255),   // Neon magenta
        sketch.color(0, 128, 255),   // Neon blue
        sketch.color(255, 128, 0),   // Neon orange
        sketch.color(128, 0, 255),   // Neon purple
    ];
    
    // Return a random neon color
    return neonColors[Math.floor(Math.random() * neonColors.length)];
}

// Function to generate a shade of a base color
function getShadeOfColor(baseColor: p5.Color, sketch: p5): p5.Color {
    // Get the base RGB values
    const r = sketch.red(baseColor);
    const g = sketch.green(baseColor);
    const b = sketch.blue(baseColor);
    
    // Create a shade by adjusting brightness (random between 80% and 120% of original)
    // Using a smaller range to keep the neon effect
    const shadeFactor = 0.8 + Math.random() * 0.4;
    
    return sketch.color(
        Math.min(255, Math.floor(r * shadeFactor)),
        Math.min(255, Math.floor(g * shadeFactor)),
        Math.min(255, Math.floor(b * shadeFactor))
    );
}

export default function GridDisplay(props: { 
    grid: HyperGrid, 
    newZone: WanderingZone | null, 
    onClick: (cellX: number, cellY: number) => void,
    useRandomColors: boolean 
}) {
    const newZoneRef = useRef(props.newZone);
    newZoneRef.current = props.newZone;
    const zoneColors = useRef<Map<RuleZone, p5.Color>>(new Map());
    const cellShades = useRef<Map<string, p5.Color>>(new Map());

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
                    const cellKey = `${i},${j}`;
                    
                    if (cellValue) {
                        let dominantRule = props.grid.calculateDominantRule(i, j);
                        let dominantZone = props.grid.zones.find(z => z.rule === dominantRule && z.active);
                        
                        if (dominantZone) {
                            // Get or create base color for this zone
                            if (!zoneColors.current.has(dominantZone)) {
                                zoneColors.current.set(dominantZone, getRandomBaseColor(sketch));
                            }
                            
                            const baseColor = zoneColors.current.get(dominantZone)!;
                            
                            // Get or create shade for this cell
                            if (!cellShades.current.has(cellKey)) {
                                cellShades.current.set(cellKey, getShadeOfColor(baseColor, sketch));
                            }
                            
                            const cellColor = cellShades.current.get(cellKey)!;
                            
                            // Apply colors only if useRandomColors is true
                            if (props.useRandomColors) {
                                sketch.fill(cellColor);
                                sketch.stroke(cellColor);
                            } else {
                                // Use white for all cells when colors are off
                                sketch.fill(255);
                                sketch.stroke(255);
                            }
                        } else {
                            // Default color for cells not in any zone
                            sketch.fill(255);
                            sketch.stroke(255);
                        }
                    } else {
                        sketch.fill(0);
                        sketch.stroke(0);
                    }

                    const gx = x + cellSize * 0.1;
                    const gy = y + cellSize * 0.1;
                    sketch.rect(gx, gy, cellSize * 0.8, cellSize * 0.8);
                }
            }

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
            }
        }
        
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
        return view.remove;
    }, [props.useRandomColors]); // Re-render when useRandomColors changes
  
    return (<div className="CanvasContainer" ref={myRef}></div>)
}
