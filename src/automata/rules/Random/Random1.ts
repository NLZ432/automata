import { Rule } from '../../Grid';
import { countLiveNeighbors } from '../../utils/neighbors';

export const Random1: Rule = (grid, x, y) => {
    return Math.random() < 0 + (0.1 * countLiveNeighbors(grid, x, y));
}
