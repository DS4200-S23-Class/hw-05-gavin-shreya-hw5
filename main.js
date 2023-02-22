const margin = {top: 10, right: 30, bottom: 30, left: 60};
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("#scatter-plot")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

let data = [];
d3.csv("scatter-data.csv", function(d) {
  return {
    x: +d.x,
    y: +d.y
  };
}).then(function(d) {
  data = d;


  drawScatterPlot(data);


  d3.select("form").on("submit", function() {
    d3.event.preventDefault();
    const x = +d3.select("#x-input").node().value;
    const y = +d3.select("#y-input").node().value;
    if (Number.isInteger(x) && Number.isInteger(y) && x >= 1 && x <= 9 && y >= 1 && y <= 9) {
      const newPoint = { x: x, y: y };
      data.push(newPoint);
      updateScatterPlot(data);
    }
  });
});


function drawScatterPlot(data) {

  const x = d3.scaleLinear()
    .domain([0, 10])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

caleLinear()
    .domain([0, 10])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));


  const dots = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.x); })
    .attr("cy", function(d) { return y(d.y); })
    .attr("r", 6)
    .style("fill", "#69b3a2")
    .on("mouseover", function(d) {
      d3.select(this).style("fill", "orange");
    })
    .on("mouseout", function(d) {
      d3.select(this).style("fill", "#69b3a2");
    })
    .on("click", function(d) {
      if (d3.select(this).classed("selected")) {
        d3.select(this).classed("selected", false);
        d3.select(this).style("stroke-width", "0");
        d3.select("#coordinates").text("");
      } else {
        dots.classed("selected", false);
        dots.style("stroke-width", "0");
        d3.select(this).classed("selected", true);
        d3.select(this).style("stroke-width", "2");
        d3.select("#coordinates").text("(" + d.x + ", " + d.y + ")");

	}
});
}

// get scatter plot to update
function updateScatterPlot(data) {

svg.selectAll("circle").remove();

drawScatterPlot(data);
}
//gavins code
// function toggleHighlight() {
// 	d3.select(this).classed("highlight", !d3.select(this).classed("highlight"));
// }
// function clicked() {
// 	d3.select(this).classed("clicked", !d3.select(this).classed("clicked"));
// }

// function makeScatterplot(data) {
// 	var width = 600;
// 	var height = 400;

// 	var svg = d3.select(".left").append("svg")
// 		.attr("width", width).attr("height", height)
// 		.attr("id", "scatter");

// 	var xScale = d3.scaleLinear()
// 		.domain([0,10]).range([0,width]);
	
// 	var yScale = d3.scaleLinear()
// 		.domain([0,10]).range([height,0]);
	
// 	svg.selectAll("circle").data(data).enter().append("circle")
// 		.attr("cx", function(d) { return xScale(d.x); })
// 		.attr("cy", function(d) { return yScale(d.y); })
// 		.attr("r", 6)
// 		.attr("id", "point")
// 		.on("mouseover", () => toggleHighlight())
//     .on("mouseout", () => toggleHighlight())
// 		.on("click", clicked());

// 	var xAxis = d3.axisBottom(xScale);
// 	var yAxis = d3.axisLeft(yScale);
// 	svg.append("g").attr("transform", "translate(0," + height + ")").attr("id", "x-axis").call(xAxis);
// 	svg.append("g").attr("id", "y-axis").call(yAxis);
// }

// d3.csv("data/scatter-data.csv").then(makeScatterplot)
// .catch(function(error) {
// 	console.log(error);
// });
