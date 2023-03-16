import React, { useState } from 'react'
import { getRuleText, RuleMap } from '../../automata/utils/rules';
import { Rule } from '../../automata/Grid';
import '../../App.css';

export default function RuleSelect(props: { rules: RuleMap, default: string, onSelect: (rule: Rule) => void }) {
    const [selected, setSelected] = useState<string>(props.default)
    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rule = props.rules[event.target.value];
        setSelected(event.target.value);
        props.onSelect(rule);
    };
    
    return (
        <select className="RuleSelect" value={selected} onChange={(event) => handleOptionChange(event)}>
        {
            Object.keys(props.rules).map((rule_string) => (
                <option key={rule_string} className="RuleSelectOption" value={rule_string}>{rule_string}</option>
            ))
        }
        </select> 
    );
}
