<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <h1>D3 visualization with Vue</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col><p>Click the button to shuffle the numbers</p></b-col>
        <b-col><b-button @click="shuffleNumbers">Shuffle</b-button></b-col>
      </b-row>
      <b-row>
        <b-col>
          <svg width="800" height="600" id="viz"></svg>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
const d3 = require('d3');

export default {
  name: 'App',
  components: {

  },
  // ========= data =========
  data(){ //it is a function that takes nothing and returns an object
    return {
      numbers: [88, 100, 150, 160, 289, 320, 540],
    }

  },

  // ========= mounted =========
  mounted: function(){
    this.refreshChart(this.numbers);
  },

  // ======= watch =======
  watch:{
    numbers(newVal) {
      this.refreshChart(newVal);
    }


  },
  methods: {
    refreshChart(listOfNumbers) {
      const svg = d3.select('#viz');


      // ------- scales functions -------
      const scaleLength = d3.scaleLinear()
          .domain([0, d3.max(listOfNumbers)])
          .range([0, 600]);

      const lAxis = d3.axisTop(scaleLength);

      const scalePos = d3.scaleBand()
          .domain(d3.range(listOfNumbers.length))
          .range([0, 300])
          .round(true)
          .paddingInner(0.05)
          .paddingOuter(0.05); //in termini percentuali

      svg.selectAll('g.lAxis')
          .data([0])
          .join('g')
          .attr('class', 'lAxis')
          .attr('transform', 'translate(20, 20)')
          .call(lAxis);

      const gs = svg.selectAll('g.bars')
          .data(listOfNumbers)
          .join('g').attr('class', 'bars');

      // join gs
      gs.attr('transform', (d, i) => `translate(20, ${20 + scalePos(i)})`);

      gs.selectAll('rect')
          .data(d => [d]) //the number I have as an array
          .join('rect')
          .attr('fill', '#063064')
          .attr('height', scalePos.bandwidth())
          .attr('width', scaleLength);

      gs.selectAll('text')
          .data(d => [d])
          .join('text')
          .text((d) => d)
          .style('fill', '#ffffff')
          .style("font-size", "19px")
          .attr('x', scaleLength)
          .attr("dx", "-2.4em")
          .attr('y', scalePos.bandwidth() / 2);
    },

    shuffleNumbers(){
      const N = Math.round(Math.random()+6);
      this.numbers = d3.range(N).map(d => Math.round(d+Math.random()*400));
      //d3.range --> create an array with N elements
    }
  },

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
