import React, { useRef, useEffect, useState } from "react";
import {
	select,
	line,
	axisBottom,
	scaleBand,
	axisLeft,
	scaleLinear,
	tickArguments,
	max,
	min,
	extent
} from "d3";
import {curveBasis} from "d3-shape";
import useResizeObserver from "use-resize-observer";
import {format} from 'd3-format';
import { regressionLinear } from "d3-regression";


function LineCbartsSvg(props) {
	console.log('props in linecharts >>>', props)
const data = props.data;
	console.log('data in lincharts >>>', data)

const margin = 50;
  const svgRef = useRef();
  const  { ref, width=1, height=1 } = useResizeObserver();
	console.log('width >>>', width)
	console.log('height >>>', height)

  useEffect(() => {
    const svg = select(svgRef.current)
// x axis
	  const xExtent = extent(data, d => (d.acres));
    const xScale = scaleLinear()
	  .domain(xExtent)
      .range([margin, width-margin])
    const xAxis = axisBottom(xScale)
		.ticks(data.length)
		.tickFormat(format('0000'))
		.tickSize(12)

	  svg .append("g")
	  .attr("transform", `translate(0,${height - margin})`)
      .call(xAxis)
	  .style("font-size","2.5vh")

// y axis
	  const yExtent = extent(data, d => (d.cost));
	const yScale = scaleLinear()
	.domain(yExtent)
    .range([height-margin, margin]);

    const yAxis = axisLeft(yScale)
	  .ticks(5)

	  svg .append("g")
	  .attr("transform", "translate(" + margin + ", 0)")
      // .style("transform", "translateX(width)")
	  .style("font-size","2.5vh")
      .call(yAxis)



  svg.append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "black")
	  .attr("stroke-width", 2);

  svg.selectAll("circle")
		  .data(data)
		  .enter()
		  .append("circle")
		  .attr("fill", "green")
		  .attr("r", 5)
		  .attr("cx", d => xScale(d.acres))
		  .attr("cy", d => yScale(d.cost));

const regression = regressionLinear()
		  .x(d => d.acres)
		  .y(d => d.cost)
		  .domain(xExtent)

let res = regression(data);
	  console.log('res >>>', res)

let x = scaleLinear().range(xExtent);
let y = scaleLinear().range(yExtent);

// const regline = line()
// 		  .attr('x1', 3)
// 		  .attr('y1', 200)
// 		  .attr('x2', 10)
// 		  .attr('y2', 300)
// 		  .attr('class', 'regline')
// 		  .attr("fill", "none")
// 		  .style("stroke", "steelblue")
// 		  .style("stroke-width", "2px");

console.log('res00', xScale(res[0][0]));
console.log('res00', yScale(res[0][1]));
console.log('res00', xScale(res[1][0]));
console.log('res00', yScale(res[1][1]));

svg.append("line")
    .style("stroke", "black")
	.style("stroke-width", "2px")
    .attr("x1", xScale(res[0][0]))
    .attr("y1", yScale(res[0][1]))
    .attr("x2", xScale(res[1][0]))
    .attr("y2", yScale(res[1][1]))

// let regline = line()
// 		  .x(d => x(d[0]))
// 		  .y(d => y(d[1]));
// 	  console.log('regline >>>', regline)

// const dataline = line()
//       .x(d => xScale(d.acres))
// 	  .y(d => yScale(d.cost))
// 		.curve(curveBasis);

// svg.append("path")
// 		  // .datum(res)
// 		  .attr("d", regline)
// 		  .attr("fill", "none")
// 		  .style("stroke", "steelblue")
// 		  .style("stroke-width", "2px");

	  return () => {
      svg.selectAll("*").remove();
	  }

  }, [data, width, height] );

  return (
	<div ref={ref} >
			  <svg ref={svgRef}
				width= "100%"
				  height = {500}>
			  </svg>
	  </div>
  );
}

export default LineCbartsSvg;
