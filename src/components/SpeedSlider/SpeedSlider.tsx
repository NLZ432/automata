import React, { useState, useEffect } from "react";

import '../../App.css';

const slidermax: number = 100;
const slidermin: number = 0;

function scaleit(val: number, min: number, max: number) {
    var minv = Math.log(1);
    var maxv = Math.log(max);

    // calculate adjustment factor
    var scale = (maxv-minv) / (slidermax-slidermin);

    return Math.exp(minv + scale*(val - min));
}

// Convert from interval value to slider value
function unscaleit(val: number, min: number, max: number) {
    var minv = Math.log(1);
    var maxv = Math.log(max);

    // calculate adjustment factor
    var scale = (maxv-minv) / (slidermax-slidermin);

    return slidermax - (Math.log(val) - minv) / scale;
}

export default function SpeedSlider(props: { 
    min: number, 
    max: number, 
    setInterval: (value: number) => void,
    value?: number
}) {
    const [sliderValue, setSliderValue] = useState(80);
    const [loggedValue, setLoggedValue] = useState(scaleit(80, props.min, props.max));

    // Update slider when value prop changes
    useEffect(() => {
        if (props.value !== undefined) {
            const newSliderValue = unscaleit(props.value, props.min, props.max);
            setSliderValue(newSliderValue);
            setLoggedValue(props.value);
        }
    }, [props.value, props.min, props.max]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSliderValue = Number(event.target.value);
        setSliderValue(newSliderValue);
        const newLoggedValue = scaleit(slidermax - newSliderValue, props.min, props.max);
        props.setInterval(newLoggedValue);
        setLoggedValue(newLoggedValue);
    };

    return (
        <div>
            <input 
                className="slider"
                type="range"
                min={slidermin}
                max={slidermax}
                value={sliderValue}
                onChange={handleChange}
            />
        </div>
    );
}
