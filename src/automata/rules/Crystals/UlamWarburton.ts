import { Rule } from '../../Grid';
import { getNeighborEast, getNeighborNorth, getNeighborSouth, getNeighborWest } from '../../utils/neighbors'

export const UlamWarburton: Rule = (grid, x, y) => {
    let alive = grid.getCell(x, y);

    let liveNeighbors = 0;
    if (getNeighborEast(grid, x, y)) liveNeighbors++;
    if (getNeighborNorth(grid, x, y)) liveNeighbors++;
    if (getNeighborWest(grid, x, y)) liveNeighbors++;
    if (getNeighborSouth(grid, x, y)) liveNeighbors++;

    if (!alive)
    {
        if (liveNeighbors == 1) alive = true;
    }

    return alive;
}