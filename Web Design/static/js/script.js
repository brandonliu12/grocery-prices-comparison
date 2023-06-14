document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('product-dropdown');
    const tableBody = document.getElementById('table-body');
    const chartContainer = document.getElementById('chart-container');
    const locations = ['Edmonton', 'Toronto', 'Vancouver', 'Ottawa'];

    // Fetch data from the API endpoint
    fetch('http://localhost:5000/api')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debug statement to check the retrieved data

            let html = '';

            // Populate the dropdown with product IDs and names
            const productIds = new Set();
            data.forEach(row => {
                productIds.add(row['product id']);
            });
            productIds.forEach(productId => {
                const selectedRow = data.find(row => row['product id'] === parseInt(productId));
                const option = document.createElement('option');
                option.value = productId;
                option.textContent = `Product ID: ${productId} - ${selectedRow['product name']}`;
                dropdown.appendChild(option);
            });

            // Add change event listener to the dropdown
            dropdown.addEventListener('change', handleProductChange);

            // Handle change event on the dropdown
            function handleProductChange(event) {
                const selectedProductId = event.target.value;

                // Find the row matching the selected product ID
                const selectedRow = data.find(row => row['product id'] === parseInt(selectedProductId));

                // Generate the table rows with prices for each location
                let tableRows = '';
                locations.forEach(location => {
                    const price = selectedRow ? selectedRow[location] : 'N/A';
                    const formattedPrice = price !== 'N/A' ? `$${price.toFixed(2)}` : 'N/A';
                    tableRows += `
                        <tr>
                            <td>${location}</td>
                            <td>${formattedPrice}</td>
                        </tr>
                    `;
                });

                // Update the table body with the generated rows
                tableBody.innerHTML = tableRows;

                // Generate data for the bar chart
                const chartData = locations.map(location => {
                    const price = selectedRow ? selectedRow[location] : 0;
                    return {
                        location,
                        price
                    };
                });

                // Plot the bar chart
                const chartLayout = {
                    title: 'Prices by Location',
                    xaxis: {
                        title: 'Location'
                    },
                    yaxis: {
                        title: 'Price'
                    }
                };

                const chartTrace = {
                    x: chartData.map(item => item.location),
                    y: chartData.map(item => item.price),
                    type: 'bar'
                };

                Plotly.newPlot('chart-container', [chartTrace], chartLayout);
            }
        })
        .catch(error => console.error('Error:', error));
});
