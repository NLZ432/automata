import React from 'react';
import { Example, examples } from '../../automata/examples';
import HyperGrid from '../../automata/HyperGrid';
import '../../App.css';

interface ExampleSelectProps {
    grid: HyperGrid;
    onSelect: (example: Example) => void;
}

export default function ExampleSelect({ grid, onSelect }: ExampleSelectProps) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedExample = examples.find(ex => ex.name === event.target.value);
        if (selectedExample) {
            onSelect(selectedExample);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <p>Example:</p>
            <select 
                className="RuleSelect"
                onChange={handleChange}
                defaultValue=""
            >
                <option value="" disabled>Select an example</option>
                {examples.map(example => (
                    <option 
                        key={example.name} 
                        value={example.name}
                        className="RuleSelectOption"
                    >
                        {example.name}
                    </option>
                ))}
            </select>
        </div>
    );
} 