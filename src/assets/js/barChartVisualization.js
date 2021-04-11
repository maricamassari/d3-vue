const d3 = require('d3');

function chart(){

    let width = 700;
    let height = 300;

    const scaleLength = d3.scaleLinear()
        //.domain([0, d3.max(listOfNumbers)])
        .range([0, width]);
    const lAxis = d3.axisTop(scaleLength);
    const scalePos = d3.scaleBand()
        //.domain(d3.range(listOfNumbers.length))
        .range([0, height])
        .round(true)
        .paddingInner(0.1)
        .paddingOuter(0.05);

    function my(selection){ //selection is the result of the selectAll d3 function

        let numbers = selection.datum();

        scaleLength.domain([0, d3.max(numbers) + 50]);
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

        gs.attr('transform', (d, i) => `translate(20, ${30 + scalePos(i)})`);

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
            .attr('y', scalePos.bandwidth() / 2 + 5);
    }

    my.width = function(value){
        if(!arguments.length) return width;
        width = value;
        scaleLength.range([0, width- 50]);
        return my;
    }

    my.height = function(value){
        if(!arguments.length) return height;
        height = value;
        scalePos.range([0, height - 50]);
        return my;
    }

    return my;
}

export default chart;
