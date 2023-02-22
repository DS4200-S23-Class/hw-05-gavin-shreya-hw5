function toggleHighlight() {
	d3.select(this).classed("highlight", !d3.select(this).classed("highlight"));
}
function clicked() {
	d3.select(this).classed("clicked", !d3.select(this).classed("clicked"));
}

function makeScatterplot(data) {
	var width = 600;
	var height = 400;

	var svg = d3.select(".left").append("svg")
		.attr("width", width).attr("height", height)
		.attr("id", "scatter");

	var xScale = d3.scaleLinear()
		.domain([0,10]).range([0,width]);
	
	var yScale = d3.scaleLinear()
		.domain([0,10]).range([height,0]);
	
	svg.selectAll("circle").data(data).enter().append("circle")
		.attr("cx", function(d) { return xScale(d.x); })
		.attr("cy", function(d) { return yScale(d.y); })
		.attr("r", 6)
		.attr("id", "point")
		.on("mouseover", () => toggleHighlight())
    .on("mouseout", () => toggleHighlight())
		.on("click", clicked());

	var xAxis = d3.axisBottom(xScale);
	var yAxis = d3.axisLeft(yScale);
	svg.append("g").attr("transform", "translate(0," + height + ")").attr("id", "x-axis").call(xAxis);
	svg.append("g").attr("id", "y-axis").call(yAxis);
}

d3.csv("data/scatter-data.csv").then(makeScatterplot)
.catch(function(error) {
	console.log(error);
});
