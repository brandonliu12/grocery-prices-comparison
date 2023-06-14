document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('product-dropdown');
    const tableBody = document.getElementById('table-body');
    const locations = ['Edmonton', 'Toronto', 'Vancouver', 'Ottawa'];

    // Fetch data from the API endpoint
    fetch('http://localhost:5000/api')
        .then(response => response.json())
        .then(data => {
            //console.log(data); // Debug statement to check the retrieved data

            let html = '';

            // Populate the dropdown with product IDs and names
            data.forEach(row => {
                const productId = row['product id'];
                const productName = row['product name'];
                const option = document.createElement('option');
                option.value = productId;
                option.textContent = `${productId} - ${productName}`;
                dropdown.appendChild(option);
            });


            

            // Add change event listener to the dropdown
            dropdown.addEventListener('change', handleProductChange);

            // Handle change event on the dropdown
            function handleProductChange(event) {
                const selectedProductId = event.target.value;

                // Find the row matching the selected product ID
                const selectedRow = data.find(row => row['product id'] === parseInt(selectedProductId));


                let prices = [];

                // Generate the table rows with prices for each location
                let tableRows = '';
                locations.forEach(location => {
                    const price = selectedRow ? selectedRow[location] : 'N/A';
                    const formattedPrice = price !== 'N/A' ? `$${price.toFixed(2)}` : 'N/A';
                    prices.push(price)
                    tableRows += `
                        <tr>
                            <td>${location}</td>
                            <td>${formattedPrice}</td>
                        </tr>
                    `;
                });

                // Update the table body with the generated rows
                tableBody.innerHTML = tableRows;

                console.log(prices);

                let barData = [
                    {
                        x:locations,
                        y:prices,
                        text: prices,
                        type: 'bar',    
                    }];    
                Plotly.newPlot("bar", barData);


                let mapdata = [{
                    type: 'scattergeo',
                    mode: 'markers',
                    text: locations,//diff, //'Toronto', 'Vancouver', 'Edmonton','Ottawa'],
                    lon: [-113.28, -79.24, -123.06, -75.43],//[-79.24, -123.06, -113.28,-75.43],
                    lat: [53.34, 43.65, 49.13,  45.24],//[43.4, 49.13, 53.34, 45.24,44.64],
                    marker: {
                        size: [20, 20, 20, 20],
                        color: prices,
                        line: {
                            color: 'black'
                        }
                    },
                    name: 'Canada'
                  }];
                
                  let layout = {
                     'geo': {
                        'scope': 'north america',
                        'resolution': 50,
                        lonaxis: { 
                          'range': [-130, -55]
                      },
                      lataxis: {
                          'range': [40, 70]
                      }
                    }
                  };
                  Plotly.newPlot("bubble", mapdata, layout);
              
            }

            // Trigger change event for initial selection
            dropdown.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error:', error));
});


