import React, { Component } from "react";
import * as d3 from "d3";

const theColors = d3.interpolateOranges
const theWidth = d3.scaleBand().domain(d3.range(20));

const Swatch = ({ color, width, x, y }) => (
    <rect width={width} height="20" x={x} y={y} style={{ fill: color }} />
);

export default function ScaleColor({ data }) {
    return (
        <g>
            {data.map(i => (
                <Swatch
                    color={theColors[i]}
                    width={theWidth.step()}
                    x={width(i)}
                    y="0"
                />
            ))}
        </g>
    );
}
