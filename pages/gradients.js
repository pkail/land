import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

var payoff = [{ "x": 1300, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1310, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1320, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1330, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1340, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1350, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1360, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1370, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1380, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1390, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1400, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1410, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1420, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1430, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1440, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1450, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1460, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1470, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1480, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1490, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1500, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1510, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1520, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1530, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1540, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1550, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1560, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1570, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1580, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1590, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1600, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1610, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1620, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1630, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1640, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1650, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1660, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1670, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1680, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1690, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1700, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1710, "total": 0, "leg1": 0, "leg2": 0 }, { "x": 1720, "total": 10, "leg1": 10, "leg2": 0 }, { "x": 1730, "total": 20, "leg1": 20, "leg2": 0 }, { "x": 1740, "total": 30, "leg1": 30, "leg2": 0 }, { "x": 1750, "total": 40, "leg1": 40, "leg2": 0 }, { "x": 1760, "total": 50, "leg1": 50, "leg2": 0 }, { "x": 1770, "total": 60, "leg1": 60, "leg2": 0 }, { "x": 1780, "total": 70, "leg1": 70, "leg2": 0 }, { "x": 1790, "total": 80, "leg1": 80, "leg2": 0 }, { "x": 1800, "total": 90, "leg1": 90, "leg2": 0 }, { "x": 1810, "total": 100, "leg1": 100, "leg2": 0 }, { "x": 1820, "total": 110, "leg1": 110, "leg2": 0 }, { "x": 1830, "total": 120, "leg1": 120, "leg2": 0 }, { "x": 1840, "total": 130, "leg1": 130, "leg2": 0 }, { "x": 1850, "total": 140, "leg1": 140, "leg2": 0 }, { "x": 1860, "total": 150, "leg1": 150, "leg2": 0 }, { "x": 1870, "total": 160, "leg1": 160, "leg2": 0 }, { "x": 1880, "total": 170, "leg1": 170, "leg2": 0 }, { "x": 1890, "total": 180, "leg1": 180, "leg2": 0 }, { "x": 1900, "total": 190, "leg1": 190, "leg2": 0 }, { "x": 1910, "total": 200, "leg1": 200, "leg2": 0 }, { "x": 1920, "total": 210, "leg1": 210, "leg2": 0 }, { "x": 1930, "total": 220, "leg1": 220, "leg2": 0 }, { "x": 1940, "total": 230, "leg1": 230, "leg2": 0 }, { "x": 1950, "total": 240, "leg1": 240, "leg2": 0 }, { "x": 1960, "total": 250, "leg1": 250, "leg2": 0 }, { "x": 1970, "total": 260, "leg1": 260, "leg2": 0 }, { "x": 1980, "total": 270, "leg1": 270, "leg2": 0 }, { "x": 1990, "total": 280, "leg1": 280, "leg2": 0 }]

// const RespLineChart = ({payoff}) => {
const RespLineChart = () => {

  // Element References
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const svgContainer = useRef(null); // The PARENT of the SVG

  // State to track width and height of SVG Container
  const [width, setWidth] = useState();
  const [height, setHeight] = useState(400);

  // This function calculates width and height of the container
  const getSvgContainerSize = () => {
    const newWidth = svgContainer.current.clientWidth;
    setWidth(newWidth);

    const newHeight = svgContainer.current.clientHeight;
    setHeight(newHeight);
  };

  useEffect(() => {
    // detect 'width' and 'height' on render
    getSvgContainerSize();
    // listen for resize changes, and detect dimensions again when they change
    window.addEventListener("resize", getSvgContainerSize);
    // cleanup event listener
    return () => window.removeEventListener("resize", getSvgContainerSize);
  }, []);

  useEffect(() => {
    // D3 Code

    // data_type variables switch
    let xAccessor = (d) => d.x;
    let yAccessor = (d) => d.total;
    let yAxisLabel = "Test Label";
    

    // Dimensions
    let dimensions = {
      width: width, // width from state
      height: height, // height from state
      margins: 50,
    };

    dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

    // Selections
    const svg = d3
      .select(svgRef.current)
      .classed("line-chart-svg", true)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    // clear all previous content on refresh
    const everything = svg.selectAll("*");
    everything.remove();

    const container = svg
      .append("g")
      .classed("container", true)
      .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);

    // const tooltip = d3.select(tooltipRef.current);
    // const tooltipDot = container
    //   .append("circle")
    //   .classed("tool-tip-dot", true)
    //   .attr("r", 5)
    //   .attr("fill", "#fc8781")
    //   .attr("stroke", "black")
    //   .attr("stroke-width", 2)
    //   .style("opacity", 0)
    //   .style("pointer-events", "none");

    // Scales
    const yScale = d3
      .scaleLinear()
      .domain([.10, d3.max(payoff, yAccessor)])
      .range([dimensions.containerHeight, 0])
      .nice();

    const xScale = d3.scaleLinear()
    .domain(d3.extent(payoff, xAccessor))
    .range([0, dimensions.containerWidth])

    // Line Generator
    const lineGenerator = d3
      .line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));

    // Draw Line
    container
      .append("path")
      .datum(payoff)
      .attr("d", lineGenerator)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("filter", "url(#glow)")

      const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", yScale(0))
      .attr("x2", 0).attr("y2", d3.max(payoff, yAccessor))
      .selectAll("stop")
      .data([
          {offset: "0%", color: "white"},
          {offset: "50%", color: "green"}
      ])
      .enter().append("stop")
      .attr("offset", (d)  => d.offset )
      .attr("stop-color", (d) => d.color );


      const defs = svg.append("defs");
      const filter = defs.append("filter")
        .attr("id", "glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
      
      filter.append("feGaussianBlur")
        .attr("stdDeviation", "5")
        .attr("result", "coloredBlur");

      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
      feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");      





    // Axis
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d}`);

    const yAxisGroup = container.append("g").classed("yAxis", true).call(yAxis);

    // y-axis label
    yAxisGroup
      .append("text")
      .attr("x", -dimensions.containerHeight / 2)
      .attr("y", -dimensions.margins + 10)
      .attr("fill", "black")
      .text(yAxisLabel)
      .style("font-size", ".8rem")
      .style("transform", "rotate(270deg)")
      .style("text-anchor", "middle");

    const xAxis = d3.axisBottom(xScale).tickSizeInner(3).tickSizeOuter(0)

    container
      .append("g")
      .classed("xAxis", true)
      .style("transform", `translateY(${dimensions.containerHeight}px)`)
      .style("opacity", 0.5)
      .call(xAxis);


    // Tooltip
    // container
    //   .append("rect")
    //   .classed("mouse-tracker", true)
    //   .attr("width", dimensions.containerWidth)
    //   .attr("height", dimensions.containerHeight)
    //   .style("opacity", 0)
    //   .on("touchmouse mousemove", function (event) {
    //     const mousePos = d3.pointer(event, this);

    //     // x coordinate stored in mousePos index 0
    //     const date = xScale.invert(mousePos[0]);

    //     // Custom Bisector - left, center, right
    //     const dateBisector = d3.bisector(xAccessor).center;

    //     const bisectionIndex = dateBisector(Data, date);
    //     //console.log(bisectionIndex);
    //     // math.max prevents negative index reference error
    //     const hoveredIndexData = Data[Math.max(0, bisectionIndex)];

    //     // Update Image
    //     tooltipDot
    //       .style("opacity", 1)
    //       .attr("cx", xScale(xAccessor(hoveredIndexData)))
    //       .attr("cy", yScale(yAccessor(hoveredIndexData)))
    //       .raise();

    //     tooltip
    //       .style("display", "block")
    //       .style("top", `${yScale(yAccessor(hoveredIndexData)) - 50}px`)
    //       .style("left", `${xScale(xAccessor(hoveredIndexData))}px`);

    //     tooltip.select(".data").text(`${yAccessor(hoveredIndexData)}`);

    //     const dateFormatter = d3.timeFormat("%B %-d, %Y");

    //     tooltip.select(".date").text(`${dateFormatter(xAccessor(hoveredIndexData))}`);
    //   })
    //   .on("mouseleave", function () {
    //     tooltipDot.style("opacity", 0);
    //     tooltip.style("display", "none");
    //   });
  }, [payoff, width, height]); // redraw chart if data or dimensions change

  return (
    <div ref={svgContainer} className="line-chart">
      <svg ref={svgRef} />
      <div ref={tooltipRef} className="lc-tooltip">
        <div className="data"></div>
        <div className="date"></div>
      </div>
    </div>
  );
};

export default RespLineChart;
