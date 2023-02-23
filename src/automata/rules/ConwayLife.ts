import { Rule } from '../Grid';
export const ConwayLife: Rule = (grid, x, y) => {
    let alive = grid.getCell(x, y);

    let liveNeighbors: number = 0;
    if (x < grid.size - 1) {
        if (grid.getCell(x+1, y)) liveNeighbors++;
    }
    if (x < grid.size - 1 && y > 0) {
        if (grid.getCell(x+1, y-1)) liveNeighbors++;
    }
    if (y > 0) {
        if (grid.getCell(x, y-1)) liveNeighbors++;
    }
    if (x > 0 && y > 0) {
        if (grid.getCell(x-1, y-1)) liveNeighbors++;
    }
    if (x > 0) {
        if (grid.getCell(x-1, y)) liveNeighbors++;
    }
    if (x > 0 && y < grid.size - 1) {
        if (grid.getCell(x-1, y+1)) liveNeighbors++;
    }
    if (y < grid.size - 1) {
        if (grid.getCell(x, y+1)) liveNeighbors++;
    }
    if (x < grid.size - 1 && y < grid.size - 1) {
        if (grid.getCell(x+1, y+1)) liveNeighbors++;
    }

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