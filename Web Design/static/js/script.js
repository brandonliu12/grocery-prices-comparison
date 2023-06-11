document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('product-dropdown');
    const tableBody = document.getElementById('table-body');
    const locations = ['Edmonton', 'Toronto', 'Vancouver', 'Ottawa'];

    // Fetch data from the API endpoint
    fetch('/api')
        .then(response => response.json())
        .then(data => {
            let html = '';

            // Populate the dropdown with product IDs
            const productIds = new Set();
            data.forEach(row => {
                productIds.add(row['Product ID']);
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

                // Filter data based on the selected product ID
                const filteredData = data.filter(row => row['Product ID'] === selectedProductId);

                // Generate the table rows with prices for each location
                let tableRows = '';
                locations.forEach(location => {
                    const matchedRow = filteredData.find(row => row['Location'] === location);
                    const price = matchedRow ? matchedRow['Price'] : 'N/A';
                    tableRows += `
                        <td>${price}</td>
                    `;
                });

                // Update the table body with the generated rows
                tableBody.innerHTML = `
                    <tr>
                        <th scope="row">${selectedProductId}</th>
                        ${tableRows}
                    </tr>
                `;
            }
        })
        .catch(error => console.error('Error:', error));
});
