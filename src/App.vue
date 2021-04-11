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
          <svg :width="width" :height="height" id="viz"></svg>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
const d3 = require('d3');

import chart from "@/assets/js/barChartVisualization";

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
      const N = Math.round(Math.random()+5);
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
