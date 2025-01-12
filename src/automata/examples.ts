import { Rule } from "./Grid";
import { WanderingZone } from "./HyperGrid";
import { ConwayLife } from "./rules/Conway/ConwayLife";
import { UlamWarburton } from "./rules/Crystals/UlamWarburton";
import { Random1 } from "./rules/Random/Random1";

export interface Example {
    name: string;
    description: string;
    baseRule: Rule;
    cursorRule: Rule;
    wanderingZones: WanderingZone[];
    initialState: (size: number) => boolean[][];  // Function to generate initial state based on grid size
    speed?: number;  // Optional update interval in milliseconds
}

// Helper to create a glider pattern
const createGlider = (size: number): boolean[][] => {
    const grid = Array(size).fill(null).map(() => Array(size).fill(false));
    // Place glider in top-left corner
    const glider = [[0, 1, 0], [0, 0, 1], [1, 1, 1]];
    glider.forEach((row, i) => 
        row.forEach((cell, j) => {
            grid[i + 1][j + 1] = cell === 1;
        })
    );
    return grid;
};

// Helper to create a simple crystal seed
const createCrystalSeed = (size: number): boolean[][] => {
    const grid = Array(size).fill(null).map(() => Array(size).fill(false));
    // Place single true cell in center
    const center = Math.floor(size / 2);
    grid[center][center] = true;
    return grid;
};

export const examples: Example[] = [
    {
        name: "Conway's Game of Life",
        description: "Classic cellular automaton with a glider pattern",
        baseRule: ConwayLife,
        cursorRule: ConwayLife,
        wanderingZones: [],
        initialState: createGlider,
        speed: 100  // Moderate speed for watching glider movement
    },
    {
        name: "Crystal Growth",
        description: "Ulam-Warburton crystal growth from a central seed",
        baseRule: UlamWarburton,
        cursorRule: UlamWarburton,
        wanderingZones: [],
        initialState: createCrystalSeed,
        speed: 50  // Faster speed for crystal growth
    },
    {
        name: "Multi-Zone Example",
        description: "Multiple rules interacting in different zones",
        baseRule: Random1,
        cursorRule: ConwayLife,
        wanderingZones: [
            new WanderingZone(ConwayLife, 10, 10, 8, 1, 5),
            new WanderingZone(UlamWarburton, 30, 30, 12, 2, 8)
        ],
        initialState: size => Array(size).fill(null).map(() => Array(size).fill(false))
        // No speed specified - will use current speed
    }
]; 