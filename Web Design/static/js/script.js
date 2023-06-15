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

                // Bar plot with prices
                let barData = [
                    {
                        x:locations,
                        y:prices,
                        text: prices,
                        hoverinfo: 'text',
                        type: 'bar',    
                    }];    

                var barLayout = {
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    yaxis: {
                        title: 'Price (CAD)'
                    },
                    font: {
                        color: "rgb(173, 181, 189)"
                    },
                };
                      
                Plotly.newPlot("bar", barData, barLayout);

                // Get lowest price
                let minPrice = 9999.99
                for (i =0; i < prices.length; i++){
                    if (prices[i] < minPrice){
                        minPrice = prices[i];
                    }
                }

                // Difference between location price and lowest price
                let priceDiff = [];
                let colours = [];
                let bubbleText = [];
                for (i = 0; i < prices.length; i++){
                    // Javascript decimal subtraction error workaround
                    d = ((prices[i]*100) - (minPrice*100)) / 100;
                    priceDiff.push(d);
              
                    if (d == 0){
                      colours.push('#00FF00');
                      bubbleText.push(locations[i] + ', Lowest Price');
                    } else if (d < 1) {
                      colours.push('#FFFF00');
                      bubbleText.push(locations[i] + ', $' + d + ' Higher');
                    } else if (d >= 1){
                      colours.push('#FF0000');
                      bubbleText.push(locations[i] + ', $' + d + ' Higher');
                    } else {
                      colours.push('#FFFFFF');
                      bubbleText.push(locations[i] + ', Item Not Available');
                    }          
                  }

                // Bubblemap 
                let mapdata = [{
                    type: 'scattergeo',
                    mode: 'markers',
                    lon: [-113.28, -79.24, -123.06, -75.43],
                    lat: [53.34, 43.65, 49.13,  45.24],
                    hoverinfo: 'text',
                    text: bubbleText,
                    marker: {
                        size: [20, 20, 20, 20],
                        color: colours,
                        line: {
                            color: 'black'
                        }
                    }
                }];
                
                let layout = {
                    title: 'Lowest Price <br><sup>Green: Lowest, Yellow: < $1 Higher, Red: >= $1 Higher </sup>' ,
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    height:800,
                    'geo': {
                        'scope': 'north america',
                        'resolution': 50,
                        lonaxis: { 
                          'range': [-130, -55]
                        },
                        lataxis: {
                          'range': [40, 70]
                        },

                    },
                    autosize: true,
                    automargin: true,
                    font: {
                        color: "rgb(173, 181, 189)",
                    }
                };
                Plotly.newPlot("bubble", mapdata, layout);
              
            }

            // Trigger change event for initial selection
            dropdown.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error:', error));
});


