import React, { useRef, useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import remove from 'lodash.remove';
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
	extent,
	deviation
} from "d3";
import useResizeObserver from "use-resize-observer";
import {format} from 'd3-format';
import { regressionLinear } from "d3-regression";
import d3tip from 'd3-tip';


function LineCbartsSvg(props) {
// Filter by acre
// const unfilteredData = props.data;
const data = props.tripleFilteredData;
	console.log('data >>>', data)
	console.log('triplefiltereddata >>>', props.tripleFilteredData)


const margin = 50;
  const svgRef = useRef();
  const  { ref, width=1, height=1 } = useResizeObserver();

  useEffect(() => {
    const svg = select(svgRef.current)
// x axis
	  const xExtent = extent(data, d => d.acres);
	  console.log('xExtent >>>', xExtent)
	  const xMin = min(data, d => d.acres);
	  console.log('xMin >>>', xMin)
	  const xMax = max(data, d => d.acres);
	  console.log('xMax >>>', xMax)
    const xScale = scaleLinear()
	  .domain(xExtent)
      .range([2.5*margin, width-margin])
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
	  .ticks(10)

	  svg .append("g")
	  .attr("transform", "translate(" + 2.5*margin + ", 0)")
      // .style("transform", "translateX(width)")
	  .style("font-size","2.5vh")
      .call(yAxis);

	  svg.append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "black")
	  .attr("stroke-width", 2);


// Tooltip
var tip = d3tip()
			.attr('class', 'd3-tip')
		  .html((event, datum) => {return datum.acres + " acres" + "<br/>" + "$" + format(",")(datum.cost)+ "/ acre" + "<br/>" + "$" +  format(",")(datum.price)})
	.attr("color", "white")
	.attr("background-color", "black")

const circle= svg.selectAll("circle")
		  .data(data)
		  .enter()
		  .append("circle")
		  .attr("fill", "lightgreen")
		  .attr("r", 5)
		  .attr("cx", d => xScale(d.acres))
		  .attr("cy", d => yScale(d.cost))
		.call(tip)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)

const regression = regressionLinear()
		  .x(d => d.acres)
		  .y(d => d.cost)
		  .domain(xExtent)

let res = regression(data);

svg.append("line")
    .style("stroke", "white")
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
	.attr("x1", xScale(xMax))
    .attr("y2", yScale(meanCost));

	  const medianCost = median(data, d => d.cost)
	  console.log('medianCost >>>', medianCost)

svg.append("line")
    .style("stroke", "lightblue")
	.style("stroke-dasharray", ("3, 3"))
	.style("stroke-width", "2px")
	.attr("x1", xScale(xMin))
    .attr("y1", yScale(medianCost))
	.attr("x1", xScale(xMax))
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
