<template>
  <div id="app">
    <h1>D3 visualization within Vue</h1>
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
    // ------- variables -------
    let numbers = [100, 250, 160, 88, 200];
    const svg = d3.select('#viz');

    const rects = svg.selectAll('rect')
      .data(numbers)
      .join('rect');

    const labels = svg.selectAll('text')
        .data(numbers)
        .join('text');

    // ------- scales functions -------
    const scaleLength = d3.scaleLinear()
        .domain([0, d3.max(numbers)])
        .range([0, 600]);

    const scalePos = d3.scaleBand()
        .domain([0,1,2,3,4])
        .range([0, 150])
        .round('x', true)
        .paddingInner(0.06)
        .paddingOuter(0.06); //in termini percentuali

    // ------- update -------
    rects
      .attr('x', 20)
      .attr("fill", '#989FCE')
      .attr('height', scalePos.bandwidth())
      .attr('y', (d,i) => scalePos(i))
      .attr('width', scaleLength);


    // ------- create text labels -------

    labels
      .text( (d) => d)
      .attr('x', scaleLength)
      .attr('y', (d,i) => scalePos(i))
      .attr('dy', scalePos.bandwidth()/2+5)
      .attr('dx', -20);
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
