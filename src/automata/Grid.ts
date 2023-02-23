export type Rule = (grid: Grid, x: number, y: number) => boolean;
export default class Grid {
    size: number;
    grid: Array<Array<boolean>>;
    rule: Rule;
    constructor(rule: Rule) {
        this.rule = rule;
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

    setCell(x: number, y: number, value: boolean): void {
        this.grid[x][y] = value;
    }

    update() {
        //initialize new grid
        let newGrid: Array<Array<boolean>> = [];
        for (let i = 0; i < this.size; i++)
        {
            newGrid.push([]);
            for (let j = 0; j < this.size; j++) {
                newGrid[i].push(false);
            }
        }

        //apply rule to new grid
        for (let i = 0; i < this.size; i++)
        {
            for (let j = 0; j < this.size; j++) {
                newGrid[i][j] = this.rule(this, i, j);
            }
        }

        //update grid
        this.grid = newGrid;
    }
}
