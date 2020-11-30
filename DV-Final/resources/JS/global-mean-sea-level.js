function init() {
  // set the dimensions and margins of the graph
  var margin = { top: 35, right: 20, bottom: 70, left: 70 },
    width = 880 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv("../DV-Final/data/global-mean-sea-level.csv", function (data) {
    // List of groups (here I have one group per column)
    var allGroup = [
      "GMSL variation (mm) without GIA",
      "GMSL variation (mm) with GIA",
      "Smoothed GMSL variation (mm) with GIA",
    ];

    // add the options to the button
    d3.select("#selectButton")
      .selectAll("myOptions")
      .data(allGroup)
      .enter()
      .append("option")
      .text(function (d) {
        return d;
      }) // text showed in the menu
      .attr("value", function (d) {
        return d;
      }); // corresponding value returned by the button

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

    // Add X axis --> it is a date format
    var x = d3
      .scaleLinear()
      .domain(
        d3.extent(data, function (d) {
          return d.Year;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // text label for the x axis
    svg
      .append("text")
      .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top) + ")")
      .style("text-anchor", "middle")
      .text("Year");

    // Add Y axis
    var y = d3.scaleLinear().domain([-60, 80]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // text label for the y axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Sea Height Variation (mm)");

    // Initialize line with group a
    var line = svg
      .append("g")
      .append("path")
      .datum(data)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(+d.Year);
          })
          .y(function (d) {
            return y(+d.valueA);
          })
      )
      .attr("stroke", function (d) {
        return myColor("valueA");
      })
      .style("stroke-width", 4)
      .style("fill", "none");

    // A function that update the chart
    function update(selectedGroup) {
      // Create new data with the selection?
      var dataFilter = data.map(function (d) {
        return { Year: d.Year, value: d[selectedGroup] };
      });

      // Give these new data to update line
      line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(+d.Year);
            })
            .y(function (d) {
              return y(+d.value);
            })
        )
        .attr("stroke", function (d) {
          return myColor(selectedGroup);
        });
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function (d) {
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value");
      // run the updateChart function with this selected option
      update(selectedOption);
    });
  });
}
window.onload = init;
