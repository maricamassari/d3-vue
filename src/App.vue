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

function chart(){

  let width = 900;
  let height = 300;

  const scaleLength = d3.scaleLinear()
      //.domain([0, d3.max(listOfNumbers)])
      .range([0, width]);
  const lAxis = d3.axisTop(scaleLength);
  const scalePos = d3.scaleBand()
      //.domain(d3.range(listOfNumbers.length))
      .range([0, height])
      .round(true)
      .paddingInner(0.05)
      .paddingOuter(0.05);

  function my(selection){ //selection is the result of the selectAll d3 function

    let numbers = selection.datum();
    scaleLength.domain([0, d3.max(numbers)]);
    scalePos.domain(d3.range(numbers.length));

    selection.selectAll('g.lAxis')
        .data([0])
        .join('g')
        .attr('class', 'lAxis')
        .attr('transform', 'translate(20, 20)')
        .call(lAxis);
    const gs = selection.selectAll('g.bars')
        .data(numbers)
        .join('g').attr('class', 'bars');
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
        .style('fill', '#070f2f')
        .style("font-size", "19px")
        .attr('x', scaleLength)
        .attr("dx", "1em")
        .attr('y', scalePos.bandwidth() / 2);
  }

  my.width = function(value){
    if(!arguments.length) return width;
    width = value;
    scaleLength.range([0, width]);
    return my;
  }

  my.height = function(value){
    if(!arguments.length) return height;
    height = value;
    scaleLength.range([0, height - 50]);
    return my;
  }

  return my;
}

export default {
  name: 'App',
  components: {

  },
  // ========= data =========
  data(){ //it is a function that takes nothing and returns an object
    return {
      numbers: [88, 100, 150, 160, 289, 320, 540],
      width: 800,
      height: 200,
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
      const barChart = chart().width(this.width).height(this.height);
      d3.select('#viz').datum(listOfNumbers).call(barChart);
    },

    shuffleNumbers(){
      const N = Math.round(Math.random()+6);
      this.numbers = d3.range(N).map(d => Math.round(d+Math.random()*400));

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
