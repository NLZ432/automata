import Grid from '../Grid'

export function getNeighborEast(grid: Grid, x: number, y: number): boolean {
    let live: boolean = false; 
    if (x < grid.size - 1) {
        live = grid.getCell(x+1, y);
    }
    return live;
}

export function getNeighborNorthEast(grid: Grid, x: number, y: number): boolean {
    let live: boolean = false; 
    if (x < grid.size - 1 && y > 0) {
        live = grid.getCell(x+1, y-1);
    }
    return live;
}

export function getNeighborNorth(grid: Grid, x: number, y: number): boolean {
    let live: boolean = false; 
    if (y > 0) {
        live = grid.getCell(x, y-1);
    }
    return live;
}

export function getNeighborNorthWest(grid: Grid, x: number, y: number): boolean {
    let live: boolean = false; 
    if (x > 0 && y > 0) {
        live = grid.getCell(x-1, y-1);
    }
    return live;
}

export function getNeighborWest(grid: Grid, x: number, y: number): boolean {
    let live: boolean = false; 
    if (x > 0) {
        live = grid.getCell(x-1, y);
    }
    return live;
}

export function getNeighborSouthWest(grid: Grid, x: number, y: number): boolean {
    let live: boolean = false; 
    if (x > 0 && y < grid.size - 1) {
        live = grid.getCell(x-1, y+1);
    }
    return live;
}

export function getNeighborSouth(grid: Grid, x: number, y: number): boolean {
    let live: boolean = false; 
    if (y < grid.size - 1) {
        live = grid.getCell(x, y+1);
    }
    return live;
}

export function getNeighborSouthEast(grid: Grid, x: number, y: number): boolean {
    let live: boolean = false; 
    if (x < grid.size - 1 && y < grid.size - 1) {
        live = grid.getCell(x+1, y+1);
    }
    return live;
}

export function countLiveNeighbors(grid: Grid, x: number, y: number): number {
    let count: number = 0;

    if (getNeighborEast(grid, x, y)) count++;
    if (getNeighborNorthEast(grid, x, y)) count++;
    if (getNeighborNorth(grid, x, y)) count++;
    if (getNeighborNorthWest(grid, x, y)) count++;
    if (getNeighborWest(grid, x, y)) count++;
    if (getNeighborSouthWest(grid, x, y)) count++;
    if (getNeighborSouth(grid, x, y)) count++;
    if (getNeighborSouthEast(grid, x, y)) count++;

    return count;
}

