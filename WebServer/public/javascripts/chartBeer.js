document.getElementById("beerDropdown").addEventListener("submit",updateGraphs);

var topSellersChart = graphDefaultConfig();
var consumersChartConfig = graphDefaultConfig();
var salesChartConfig = graphDefaultConfig();

var ctx = document.getElementById('topSellers').getContext('2d');
var sellersChart = new Chart(ctx, topSellersChart);

var ctx2 = document.getElementById('topConsumers').getContext('2d');
var consumersChart = new Chart(ctx2, consumersChartConfig);

var ctx3 = document.getElementById('topSales').getContext('2d');
var salesChart = new Chart(ctx3, salesChartConfig);

function updateGraphs(e){
    beer = document.getElementById('beers').value
    e.preventDefault()

    data = {'beer':beer}
    fetch('/beer', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        renderGraph(data[0],topSellersChart,sellersChart)
        renderGraph(data[1],consumersChartConfig,consumersChart)
        renderGraph(data[2],salesChartConfig,salesChart)
  
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
    console.log(chartConfig)
    chartConfig.data.datasets.push({
        minBarLength: 2,
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
