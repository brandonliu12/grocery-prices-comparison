document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('product-dropdown');
    const tableBody = document.getElementById('table-body');
    const chartLocation = document.getElementById("chartsPage1");
    const locations = ['Edmonton', 'Toronto', 'Vancouver', 'Ottawa'];

    
    // Fetch data from the API endpoint
    fetch('http://localhost:5000/api')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debug statement to check the retrieved data

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
            }

            // Trigger change event for initial selection
            dropdown.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error:', error));
});