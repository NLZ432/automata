export type Rule = (grid: Grid, x: number, y: number) => boolean;
export default class Grid {
    updateInterval: number;
    grid: Array<Array<boolean>>;
    running: boolean;
    size: number;
    rule: Rule;
    constructor(rule: Rule, size: number) {
        // Initialize basic grid properties
        this.updateInterval = 20;
        this.running = false;
        this.rule = rule;
        this.size = size;
        
        // Create 2D grid array filled with true values
        this.grid = Array(this.size)
            .fill(null)
            .map(() => Array(this.size).fill(true));

        // Optionally randomize the initial state
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
            }, this.updateInterval)
        }
    }

    setRunning(val: boolean) {
        this.running = val;
        if (this.running) {
            this.updateRoutine();
        }
    }

    setInterval(val: number) {
        this.updateInterval = val;
    }

    setRule(newRule: Rule) {
        this.rule = newRule;
    }

    getRule(): Rule {
        return this.rule;
    }

    clear() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = false;
            }
        }
    }
}
