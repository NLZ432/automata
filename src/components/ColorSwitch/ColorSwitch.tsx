import React from 'react'
import '../../App.css';
import { Switch, FormControlLabel } from '@mui/material';

export default function ColorSwitch(props: { checked: boolean, onChange: (checked: boolean) => void }) {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={props.checked}
                    onChange={(e) => props.onChange(e.target.checked)}
                    color="primary"
                />
            }
            label={<p style={{ color: '#61dafb' }}>Colors</p>}
        />
    );
} 