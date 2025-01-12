import { Rule } from "../../Grid";
import Grid from "../../Grid";

export const Replicator: Rule = (grid: Grid, x: number, y: number): boolean => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            
            let newX = (x + i + grid.size) % grid.size;
            let newY = (y + j + grid.size) % grid.size;
            
            if (grid.getCell(newX, newY)) count++;
        }
    }

    // Birth or survival with 1, 3, 5, or 7 live neighbors
    return count === 1 || count === 3 || count === 5 || count === 7;
} 