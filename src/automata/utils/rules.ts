import { UlamWarburton } from '../../automata/rules/Crystals/UlamWarburton';
import { UlamOopsies } from '../../automata/rules/Crystals/UlamOopsies';
import { ConwayLife } from '../../automata/rules/Conway/ConwayLife';
import { Random0 } from '../../automata/rules/Random/Random0';
import { Random1 } from '../../automata/rules/Random/Random1';
import { Caves0 } from '../../automata/rules/Caves/Caves0';
import { Maze } from '../../automata/rules/Maze/Maze';
import { Rule } from '../Grid';

export type RuleMap = {
    [key: string]: Rule
}

export const rule_map: RuleMap = {
    "UlamWarburton": UlamWarburton,
    "UlamOopsies":UlamOopsies,
    "ConwayLife":ConwayLife,
    "Random0":Random0,
    "Random1":Random1,
    "Caves0":Caves0,
    "Maze":Maze
};

export const getRuleText = (rule: Rule) => {
    let ruleText = Object.keys(rule_map).find(key => rule_map[key] === rule) 
    if (ruleText === undefined) {
        return "unknown";
    } else {
        return ruleText;
    }
}
