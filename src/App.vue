<template>
  <div id="app">
    <h1>D3 visualization with Vue</h1>
    <svg width="800" height="600" id="viz"></svg>
  </div>
</template>

<script>
const d3 = require('d3');

export default {
  name: 'App',
  components: {

  },

  mounted(){
    let numbers = [100, 250, 160, 88, 220, 500];

    const svg = d3.select('#viz');


    // ------- scales functions -------
    const scaleLength = d3.scaleLinear()
        .domain([0, d3.max(numbers)])
        .range([0, 600]);

    const lAxis = d3.axisTop(scaleLength);

    const scalePos = d3.scaleBand()
        .domain(d3.range(numbers.length))
        .range([0, 300])
        .round(true)
        .paddingInner(0.05)
        .paddingOuter(0.05); //in termini percentuali

    svg.append('g')
      .attr('class', 'lAxis')
      .attr('transform', 'translate(20, 20)')
      .call(lAxis);

    // create g group
    svg.append('g')
      .attr('class', 'lAxis')
      .attr('transform', 'translate(20, 20)')
      .call(lAxis);

    const gs = svg.selectAll('g.bars')
      .data(numbers)
      .join('g').attr('class','bars');

    // join gs
    gs.attr('transform', (d, i) => `translate(20, ${20 +scalePos(i)})`)

    gs.append('rect')
      .attr('fill', '#023e7d')
      .attr('height', scalePos.bandwidth())
      .attr('width', scaleLength);

    gs.append('text')
      .text( (d) => d)
      .style('fill', '#ffffff')
      .style("font-size", "19px")
      .attr('x', scaleLength)
      .attr("dx", "-2.4em")
      .attr('y',  scalePos.bandwidth()/2);






  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
