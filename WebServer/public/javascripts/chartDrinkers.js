
var barSpendingData = {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday','Sunday'],
        datasets: [{
            label: 'No Data',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []
        }]
    },

    // Configuration options go here
    options: {maintainAspectRatio: false}
}

var barSpendingDataMonths = {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'No Data',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []
        }]
    },

    // Configuration options go here
    options: {maintainAspectRatio: false}
}

var topTenBeers = {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'No Data',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []
        }]
    },

    // Configuration options go here
    options: {maintainAspectRatio: false,
    
        legend: {
            display: false
            },
        
        scales:{

            yAxes:[
                {
                    ticks:{
                        suggestedMin:0
                    }
                }
            ]

        }

        
        
    }
}




var ctx = document.getElementById('spendingDays').getContext('2d');
var chartDays = new Chart(ctx, barSpendingData);

var ctx2 = document.getElementById('spendingMonths').getContext('2d');
var chartMonths = new Chart(ctx2, barSpendingDataMonths);

var ctx3 = document.getElementById('beers').getContext('2d');
var chartBeers = new Chart(ctx3, topTenBeers);


function updateGraphs(e){
    e.preventDefault()
    drinkerName = document.getElementById("drinker").value
    

    const data = {name: drinkerName}
    fetch('/drinker', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        
        if(data[0].length == 0){
            alert('Drinker does not exist or has no entries')
        }
        updateBeers(data[3])
        updateSpendingMonths(data[2])
        updateSpendingDays(data[1]) 
        updateTable(data[0])
        
  
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

function updateSpendingDays(data){
 


        switchArray = {"Monday": 0, "Tuesday": 1, "Wednesday":2, "Thursday": 3, "Friday":4, "Saturday":5, "Sunday":6}
        barSpendingData.data.datasets = []
        datasetLabel = ""
        tempData = [0,0,0,0,0,0,0]

        
        data.forEach(element => {
            let color = getRandomColors(1)[0]
            if (datasetLabel != element[1]){
              barSpendingData.data.datasets.push({
                  label: datasetLabel,
                  backgroundColor: color,
                  borderColor: color,
                  data:  tempData
              })
              datasetLabel = element[1]
              tempData = [0,0,0,0,0,0,0]
            }
  
            tempData[switchArray[element[2]]] = element[0]
        });
  
        barSpendingData.data.datasets.push({
          label: datasetLabel,
          backgroundColor: getRandomColors(1)[0],
          data:  tempData
        })
        barSpendingData.data.datasets.shift()
        chartDays.update(0)
    
    

}

function updateSpendingMonths(data){
 

    barSpendingDataMonths.data.datasets = []
    datasetLabel = ""
    tempData = [0,0,0,0,0,0,0,0,0,0,0,0]
    console.log(data)
    data.forEach(element => {
        let color = getRandomColors(1)[0]
        if (datasetLabel != element[1]){
          barSpendingDataMonths.data.datasets.push({
              label: datasetLabel,
              backgroundColor: color,
              data:  tempData
          })
          datasetLabel = element[1]
          tempData = [0,0,0,0,0,0,0,0,0,0,0,0]
        }

        tempData[element[2]-1] = element[0]
    });

    barSpendingDataMonths.data.datasets.push({
      label: datasetLabel,
      backgroundColor: getRandomColors(1)[0],
      data:  tempData
    })
    barSpendingDataMonths.data.datasets.shift()
    chartMonths.update(0)



}

function updateBeers(data){
    topTenBeers.data.datasets = []
    tempData = []
    labels = []
    data.forEach(element => {
        tempData.push(element[0])
        labels.push(element[1])
    })
    topTenBeers.data.labels = labels
    topTenBeers.data.datasets.push(
        {
            data:  tempData,
            backgroundColor:getRandomColors(1)[0]
        }
    )

    chartBeers.update(0)

}

function updateTable(data){
    let tbody = document.getElementById("transactionsBody")
    let numRows = tbody.rows.length

    for (var i = 0; i < numRows; i++){

        tbody.deleteRow(0)

    }
    data.forEach(element => {
        let row = tbody.insertRow()
        element.forEach(field =>{
            console.log(field)
            let th = document.createElement("th")
            let text = document.createTextNode(field)

            th.appendChild(text)
            row.appendChild(th)


        })
    });
}

document.getElementById("updateDrinker").addEventListener("submit",updateGraphs)

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
