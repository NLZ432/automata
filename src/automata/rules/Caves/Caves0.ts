import { Rule } from '../../Grid';
import { countLiveNeighbors } from '../../utils/neighbors';

export const Caves0: Rule = (grid, x, y) => {
    let alive: boolean = grid.getCell(x,y);
    let liveNeighbors = countLiveNeighbors(grid, x, y);
    
    if (liveNeighbors > 4) alive = true;
    if (liveNeighbors < 4) alive = false;

    return alive;
}
