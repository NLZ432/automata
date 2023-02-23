export default class Grid {
    size: number;
    grid: Array<Array<boolean>>;
    constructor() {
        this.size = 30;
        
        this.grid = [];
        for (let i = 0; i < this.size; i++)
        {
            this.grid.push([]);
            for (let j = 0; j < this.size; j++) {
                this.grid[i].push(false);
            }
        }
    }

    getCell(x: number, y: number): boolean {
        return this.grid[x][y];
    }

    update() {
        for (let i = 0; i < this.size; i++)
        {
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = (Math.random() > 0.5);
            }
        }
    }
}
