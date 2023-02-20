import React, { useEffect, useId } from 'react'
import p5 from 'p5'

type SketchCleanup = { cleanup: () => void };

const STAR_MAX_DISTANCE = 3;
const STAR_SPEED = 0.02;
const STAR_SIZE = 3;

class Star {
    x: number
    y: number
    z: number

    constructor() {
        this.z = Math.random() * STAR_MAX_DISTANCE;
        this.x = (Math.random() * 2) - 1;
        this.y = (Math.random() * 2) - 1;
    }

    show(sketch: p5) {
        let sx = sketch.map(this.x / this.z, 0, 1, 0, sketch.width);
        let sy = sketch.map(this.y / this.z, 0, 1, 0, sketch.height);
        let ssize = (STAR_MAX_DISTANCE - this.z) * STAR_SIZE;
        sketch.circle(sx, sy, ssize);
    }

    update() {
        this.z -= STAR_SPEED;
        if (this.z < 0) {
            this.z = STAR_MAX_DISTANCE;
        }
    }

}

const Sketch = (sketch: p5) => {
    let stars: Array<Star> = [];

    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth/5, sketch.windowHeight/5);
        for (let i = 0; i < 100; i++) {
            stars.push(new Star());
        }
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255);
        sketch.translate(sketch.width/2, sketch.height/2);
        sketch.fill(255);
        stars.forEach(star => {
            star.show(sketch);
            star.update();
        });
    };

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth/2, sketch.windowHeight/2)
    }
}

export default function Space(props: {}) {
    const width: number = 100;
    const height: number = 100;
    const myRef: any = React.createRef()

    useEffect(() => {
        const view = new p5(Sketch, myRef.current);
		return view.remove; // This removes the duplicate canvas when the component is rerendered.
  	}, []);
  
    return (<div ref={myRef}></div>)
}
