import React, { useState } from "react";

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

export default function SpeedSlider(props: { min: number, max: number, setInterval: (value: number) => void}) {
  const [value, setValue] = useState(80);
  const [loggedvalue, setLoggedValue] = useState(scaleit(80, props.min, props.max));

  const handleChange = (event: any) => {
    setValue(event.target.value);
    let loggedval = scaleit(slidermax - event.target.value, props.min, props.max);
    props.setInterval(loggedval);
    setLoggedValue(loggedval);
  };

  return (
    <div>
      <input className="slider"
        type="range"
        min={slidermin}
        max={slidermax}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
