document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('product-dropdown');
    const tableBody = document.getElementById('table-body');
    const locations = ['Edmonton', 'Toronto', 'Vancouver', 'Ottawa'];

    // Fetch data from the API endpoint
    fetch('http://localhost:5000/api')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debug statement to check the retrieved data

            let html = '';

            // Populate the dropdown with product IDs
            const productIds = new Set();
            data.forEach(row => {
                productIds.add(row['product id']);
            });
            productIds.forEach(productId => {
                const option = document.createElement('option');
                option.value = productId;
                option.textContent = productId;
                dropdown.appendChild(option);
            });

            // Add change event listener to the dropdown
            dropdown.addEventListener('change', handleProductChange);

            // Handle change event on the dropdown
            function handleProductChange(event) {
                const selectedProductId = event.target.value;

                // Find the row matching the selected product ID
                const selectedRow = data.find(row => row['product id'] === selectedProductId);

                // Generate the table rows with prices for each location
                let tableRows = '';
                locations.forEach(location => {
                    const price = selectedRow ? selectedRow[location.toLowerCase()] : 'N/A';
                    tableRows += `
                        <tr>
                            <td>${location}</td>
                            <td>${price}</td>
                        </tr>
                    `;
                });

                // Update the table body with the generated rows
                tableBody.innerHTML = tableRows;
            }
        })
        .catch(error => console.error('Error:', error));
});
