import React from 'react';
import * as d3 from 'd3';
import { Card } from 'antd';

export default function ColorBar({
    min,
    max,
    padding = 0,
    width = 280,
    barHeight = 12,
    divisions = 200,
    tickdiv = 10,
    legend_width = 200,
    onChange
} = {}) {

    const colorScaleFunction = d3.scaleLinear()
        .domain([min, 0, max])
        .range(["#d91e3a", "#ffffff", "#3b13ed"]);

    var svg = d3.select('svg')
    svg.selectAll("*").remove()
    var g = svg.append('g');

    var theValues = d3.quantize(d3.interpolate(min, max), divisions)
    var theColors = theValues.map(colorScaleFunction)

    var innerWidth = width - (padding * 2);

    var xScale = d3.scaleLinear()
        .range([0, innerWidth - 10])
        .domain([min, max]);

    var scaleVals = d3.quantize(d3.interpolate(0, innerWidth), divisions)

    var len = theValues.length;
    var data = []
    for (var x = 0; x < len; x++) {
        var element = {
            "color": theColors[x],
            "value": Math.round(theValues[x]),
            "pos": scaleVals[x]
        };
        data.push(element);
    }

    var ticks = data.filter(f => f.value % tickdiv === 0).map(d => d.value);
    ticks.push(min, max)
    let xTicks = [... new Set(ticks)]

    var xAxis = d3.axisBottom(xScale)
        .tickSize(barHeight * 1.6)
        .tickValues(xTicks);

    g.selectAll("rect")
        .data(data)
        .enter()
        .append('rect')
        .attr("x", d => d.pos)
        .attr("width", innerWidth)
        .attr("height", barHeight)
        .style("fill", d => d.color);

    g.append("g")
        .call(xAxis)
        .select(".domain")
        .remove();

    return (
        <div>
            <Card title="Change in spenditure" bordered={false}
                style={{ position: 'fixed', zIndex: 1, width: '330px', height: '150px', bottom: "15%", left: "40px", right: "40px" }}>
                <svg style={{ top: '25px', width: width }} />
        onChange={(event) => onChange(event)}
            </Card>
        </div>
    )
}

const colorScaleFunction = d3.scaleLinear().domain([-2, 0, 20]).range(["#d91e3a", "#ffffff", "#3b13ed"]);
const colorScaleFunctionC = d3.scaleLinear().domain([-20, 0, 20]).range(["#d91e3a", "#ffffff", "#3b13ed"]);

export { colorScaleFunction, colorScaleFunctionC };
