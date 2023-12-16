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
	mean,
	median,
	mode,
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
	  const xMin = min(data, d => d.acres);
    const xScale = scaleLinear()
	  .domain(xExtent)
      .range([margin, width-margin])
    const xAxis = axisBottom(xScale)
		.ticks(data.length)
		// .tickFormat(format('0000'))
		.ticks(20)
		.tickSize(12)

	  svg .append("g")
	  .attr("transform", `translate(0,${height - margin})`)
      .call(xAxis)
	  .style("font-size","2.5vh")

// y axis
	  const yExtent = extent(data, d => (d.cost));
	  const yMin = min(data, d => d.cost);
	const yScale = scaleLinear()
	.domain(yExtent)
    .range([height-margin, margin]);

    const yAxis = axisLeft(yScale)
	  .ticks(5)

	  svg .append("g")
	  .attr("transform", "translate(" + 2.5*margin + ", 0)")
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

svg.append("line")
    .style("stroke", "black")
	.style("stroke-width", "2px")
    .attr("x1", xScale(res[0][0]))
    .attr("y1", yScale(res[0][1]))
    .attr("x2", xScale(res[1][0]))
    .attr("y2", yScale(res[1][1]))

	  const meanCost = mean(data, d => d.cost)
	  console.log('meanCost >>>', meanCost)

svg.append("line")
    .style("stroke", "red")
	.style("stroke-width", "2px")
	.style("stroke-dasharray", ("3, 3"))
	.attr("x1", xScale(xMin))
    .attr("y1", yScale(meanCost))
	.attr("x1", xScale(yMin))
    .attr("y2", yScale(meanCost));

	  const medianCost = median(data, d => d.cost)
	  console.log('medianCost >>>', medianCost)

svg.append("line")
    .style("stroke", "blue")
	.style("stroke-dasharray", ("3, 3"))
	.style("stroke-width", "2px")
	.attr("x1", xScale(xMin))
    .attr("y1", yScale(medianCost))
	.attr("x1", xScale(yMin))
    .attr("y2", yScale(medianCost));
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
