// input suggestion list

// Event listener for input field
inputEl.addEventListener('input', async (e) => {
    inputData = e.target.value.trim().toLowerCase();
    if (inputData.length >= 1) {
        const tokens = await fetchSuggestions(inputData);
        displaySuggestions(tokens);
    } else {
        suggestionsEl.style.display = 'none';
    }
});


// Fetch suggestions from the API
const fetchSuggestions = async (query) => {
    const url = `https://api.coingecko.com/api/v3/search?query=${query}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.coins.map(coin => coin.id);
        } else {
            console.log('Error fetching suggestions');
            return [];
        }
    } catch (error) {
        console.log('Fetch error:', error);
        return [];
    }
};

// Display suggestions in the dropdown
const displaySuggestions = (tokens) => {
    suggestionsEl.innerHTML = '';
    tokens.forEach(token => {
        const item = document.createElement('div');
        item.classList.add('suggestion-item');
        item.textContent = token;
        item.addEventListener('click', () => {
            inputEl.value = token;
            suggestionsEl.style.display = 'none';
        });
        suggestionsEl.appendChild(item);
    });
    suggestionsEl.style.display = 'block';
};