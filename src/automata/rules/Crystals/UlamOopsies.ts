import { Rule } from '../../Grid';
import { countLiveNeighbors } from '../../utils/neighbors'

export const UlamOopsies: Rule = (grid, x, y) => {
    let alive = grid.getCell(x, y);

    let liveNeighbors = countLiveNeighbors(grid, x, y);
    
    if (!alive)
    {
        if (liveNeighbors == 1) alive = true;
    }

    return alive;
}