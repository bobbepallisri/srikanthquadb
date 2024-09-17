window.onload = function () {
    fetch('/api/getTop10')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#crypto-table tbody');
            const bestPrice = document.querySelector('#best-price');
            tableBody.innerHTML = ''; // Clear existing table data

            // Find the platform with the best trade price (buy/sell spread)
            let bestPlatform = null;
            let bestTradePrice = Infinity;

            data.data.forEach(crypto => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${crypto.name}</td>
                    <td>${crypto.last}</td>
                    <td>${crypto.buy}</td>
                    <td>${crypto.sell}</td>
                    <td>${crypto.volume}</td>
                    <td>${crypto.base_unit}</td>
                `;

                tableBody.appendChild(row);

                const spread = parseFloat(crypto.sell) - parseFloat(crypto.buy);
                if (spread < bestTradePrice) {
                    bestTradePrice = spread;
                    bestPlatform = crypto.name;
                }
            });

            // Display best price to trade
            if (bestPlatform) {
                bestPrice.textContent = `Best platform to trade is ${bestPlatform} with a spread of ${bestTradePrice}`;
            }
        })
        .catch(error => console.error('Error fetching data:', error));
};
