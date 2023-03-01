import { Rule } from '../../Grid';

export const Random0: Rule = (grid, x, y) => {
    return Math.random() < 0.01;
}
