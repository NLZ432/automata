import React from 'react';
import '../../App.css';

interface ClearButtonProps {
    onClick: () => void;
}

export default function ClearButton({ onClick }: ClearButtonProps) {
    return (
        <button className="Playbutton" onClick={onClick}>
            <p>Clear</p>
        </button>
    );
} 