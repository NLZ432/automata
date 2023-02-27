import Grid, { Rule } from "./Grid";
import { distance } from "./utils/gridmath";

export class RuleZone {
    rule: Rule;
    radius: number;
    x: number;
    y: number;
    constructor(rule: Rule, radius: number, x: number, y: number) {
        this.rule = rule;
        this.radius = radius;
        this.x = x;
        this.y = y;
    }

    get getRadius() {
        return this.radius;
    }

    get getX() {
        return this.x;
    }

    get getY() {
        return this.y;
    }

    get getRule() {
        return this.rule;
    }
}

export default class HyperGrid extends Grid {
    zones: Array<RuleZone>;
    constructor(rule: Rule) {
       super(rule);
       this.zones = [];
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
                const dominantRule = this.calculateDominantRule(i, j);                
                newGrid[i][j] = dominantRule(this, i, j);
            }
        }

        //update grid
        this.grid = newGrid;
    }

    calculateDominantRule(x: number, y: number): Rule {
        let dominantRule: Rule = this.rule;

        for (const zone of this.zones) {
            const zx = zone.getX;
            const zy = zone.getY;
            const r = distance(x, y, zx, zy);
            if (r < zone.getRadius) {
                dominantRule = zone.getRule;
            }
        }

        return dominantRule;
    }

    addZone(zone: RuleZone) {
        this.zones.push(zone);
    }
}
