export type Rule = (grid: Grid, x: number, y: number) => boolean;
export default class Grid {
    grid: Array<Array<boolean>>;
    running: boolean;
    size: number;
    rule: Rule;
    constructor(rule: Rule) {
        this.running = false;
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

        // this.randomize();
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

    randomize() {
        for (let i = 0; i < this.size; i++)
        {
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = (Math.random() > 0.5) ? true : false;
            }
        }
    }

    updateRoutine() {
        if (this.running) {
            this.update()
            setTimeout(() => {
                if (this.running) this.updateRoutine(); 
            }, 200)
        }
    }

    setRunning(val: boolean) {
        this.running = val;
        if (this.running) {
            this.updateRoutine();
        }
    }
}
