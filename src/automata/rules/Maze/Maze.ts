import { Rule } from '../../Grid';
import { countLiveNeighbors } from '../../utils/neighbors';

export const Maze: Rule = (grid, x, y) => {
    let alive = grid.getCell(x,y);
    let liveNeighbors = countLiveNeighbors(grid, x, y);
    
    if (liveNeighbors == 3) alive = true;

    if (liveNeighbors == 0) alive = false;
    if (liveNeighbors  > 5) alive = false;

    return alive;
}

