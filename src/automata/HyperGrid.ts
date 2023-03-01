import Grid, { Rule } from "./Grid";
import { ConwayLife } from "./rules/Conway/ConwayLife";
import { distance } from "./utils/gridmath";
import { PerlinNoise } from "./utils/perlin";

export class RuleZone {
    priority: number;
    radius: number;
    rule: Rule;
    x: number;
    y: number;
    constructor(rule: Rule, radius: number, x: number, y: number, priority: number) {
        this.priority = priority;
        this.radius = radius;
        this.rule = rule;
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

    get getPriority() {
        return this.priority;
    }
}

export class WanderingZone extends RuleZone {
    wanderRadius: number;
    start: { x: number, y: number };
    noise: PerlinNoise;
    clock: number;
    constructor(rule: Rule, radius: number, x: number, y: number, priority: number, wanderRadius: number) {
        super(rule, radius, x, y, priority);
        this.wanderRadius = wanderRadius;
        this.start = { x: x, y: y };
        this.noise = new PerlinNoise();
        this.clock = 0;
    }

    wander() {
        this.clock += 0.01;
        this.x = this.start.x + this.noise.perlin2(this.clock, this.clock) * this.wanderRadius;
        this.y = this.start.y + this.noise.perlin2(this.clock + 200, this.clock + 200) * this.wanderRadius; 
        console.log(this.x);
    }
}

export default class HyperGrid extends Grid {
    zones: Array<RuleZone>;
    wanderingZones: Array<WanderingZone>;
    constructor(rule: Rule, size: number) {
       super(rule, size);
       this.wanderingZones = [];
       this.zones = [];
    }

    update() {
        //wander
        for (let wzone of this.wanderingZones) {
            wzone.wander();
        }

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
        let dominantPriority: number = 0;

        for (const zone of this.zones) {
            const zx = zone.getX;
            const zy = zone.getY;
            const r = distance(x, y, zx, zy);
            if (r < zone.getRadius && zone.getPriority > dominantPriority) {
                dominantPriority = zone.getPriority;
                dominantRule = zone.getRule;
            }
        }

        return dominantRule;
    }

    addZone(zone: RuleZone) {
        this.zones.push(zone);
    }

    addWanderingZone(wzone: WanderingZone) {
        this.wanderingZones.push(wzone);
        this.zones.push(wzone);
    }
}
