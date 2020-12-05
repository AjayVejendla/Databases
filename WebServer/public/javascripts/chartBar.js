document.getElementById("barDropdown").addEventListener("submit",updateGraphs);

var spendersChartConfig = graphDefaultConfig();
var beersChartConfig = graphDefaultConfig();
var manfChartConfig = graphDefaultConfig();
var daysChartConfig = graphDefaultConfig();
var hoursChartConfig = graphDefaultConfig();

var ctx = document.getElementById('topSpenders').getContext('2d');
var spendersChart = new Chart(ctx, spendersChartConfig);

var ctx2 = document.getElementById('topBeers').getContext('2d');
var beersChart = new Chart(ctx2, beersChartConfig);

var ctx3 = document.getElementById('topManf').getContext('2d');
var manfChart = new Chart(ctx3, manfChartConfig);

var ctx4 = document.getElementById('days').getContext('2d');
var daysChart = new Chart(ctx4, daysChartConfig);

var ctx5 = document.getElementById('hours').getContext('2d');
var hoursChart = new Chart(ctx5, hoursChartConfig);

function updateGraphs(e){
    bar = document.getElementById('bar').value
    e.preventDefault()

    data = {'bar':bar}
    fetch('/bar', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        renderGraph(data[0],spendersChartConfig,spendersChart)
        renderGraph(data[1],beersChartConfig,beersChart)
        renderGraph(data[2],manfChartConfig,manfChart)
        renderGraph(data[3],daysChartConfig,daysChart)
        renderGraph(data[4],hoursChartConfig,hoursChart)
  
      })
      .catch((error) => {
        console.error('Error:', error);
      });


}




function graphDefaultConfig(){
    return config = {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: [],
            datasets: []
        },
    
        // Configuration options go here
        options: {
            maintainAspectRatio: false,
            legend: {
            display: false
            }
        }
    }


}

function renderGraph(rawData,chartConfig,inputChart){
    numElements = rawData.length
    labels = []
    data = []
    rawData.forEach(element => {
        labels.push(element[0])
        data.push(element[1])
    });

    chartConfig.data.labels = labels;
    chartConfig.data.datasets.shift();
    chartConfig.data.datasets.push({

        backgroundColor:getRandomColors(numElements),
        data:data

    });
    chartConfig.data.datasets.data = data;
    inputChart.update()


}

function getRandomColors(n) {

    ints = []
    colorStrings = []
    min = 0;
    max = 255
        for(i = 0; i<n; i++){
            let temp = [0,0,0]
            for(j = 0; j<3; j++){
                temp[j] = (Math.floor(Math.random() * (max - min) + min)); //The maximum is exclusive and the minimum is inclusive
            }
            ints.push(temp)
        }

    ints.forEach(element => {
        colorStrings.push('rgb('+element[0]+","+element[1]+","+element[2]+")")
    });
    return colorStrings;  
  }
