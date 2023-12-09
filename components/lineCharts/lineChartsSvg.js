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


function LineCbartsSvg({data}) {
	console.log('data in linecharts >>>', data)
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


    const dataline = line()
      .x(d => xScale(d.acres))
	  .y(d => yScale(d.cost))
		.curve(curveBasis);

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
