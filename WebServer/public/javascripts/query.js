document.getElementById("queryForm").addEventListener("submit",sendQuery)

function sendQuery(e){
    e.preventDefault()
    queryValue= document.getElementById("query").value
    

    const data = {query: queryValue}
    fetch('/updates', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        alert(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}