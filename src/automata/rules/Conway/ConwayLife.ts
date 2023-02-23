import { Rule } from '../../Grid';
import { countLiveNeighbors, getNeighborEast } from '../../utils/neighbors'

export const ConwayLife: Rule = (grid, x, y) => {
    let alive = grid.getCell(x, y);

    let liveNeighbors = countLiveNeighbors(grid, x, y);

    if (alive)
    {
       if (liveNeighbors != 2 && liveNeighbors != 3)
       {
            alive = false;
       }
    }
    else
    {
        if (liveNeighbors == 3)
        {
            alive = true;
        }
    }

    return alive;
}