# LiveCrypto

Welcome!

LiveCrypto was entirely designed and created by myself, making this site a unique and original work.
I am happy to share my work with you and hope you enjoy your experience here.

This web site is a real-time platform for tracking cryptocurrency exchange rates. This application allows you to convert your cryptocurrencies into euros, dollars, and other currencies, offering real-time updates and accurate market information. Explore the latest market trends and make quick, reliable conversions to stay informed and make smart decisions.



## Features

- Token Search: Easily find cryptocurrency tokens with our powerful search engine.
- Real-time Analysis: Get detailed and live information on tokens, including prices, transaction volumes, and other essential data.
 
- Currency Comparison: Switch between different currencies to compare exchange rates and get a clear view of market variations.
- Continuous Updates: Enjoy constant data updates to stay informed about the latest trends and developments in the cryptocurrency market.
## Interface Optimisation
- Responsive design : The site is fully responsive, guaranteeing an optimal user experience on mobiles, tablets and computers.
- Burger navigation : Integration of a burger menu to facilitate navigation on mobile devices, ensuring consistent and intuitive use on small screens.
- Optimized user interface : A neat and ergonomic interface for a simplified and pleasant interaction.
## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript** vanilla
- **CoinGecko API** for retrieving cryptocurrency data
## API Reference

This application utilizes two main API endpoints provided by CoinGecko to fetch cryptocurrency data and perform search operations.

### Endpoint for -> Search bar suggestions
**Endpoint:** `https://api.coingecko.com/api/v3/search?query={query}`

**Description:** I used this endpoint to retrieve the token data coresponding to the user input. The `{query}` parameter should be replaced every time the user type a character in the search bar.

**Example Usage:**
```javascript
 //event each time there is a user input in the search bar 
    inputEl.addEventListener('input',async(e)=>{

        //retrieve user input and correction
        inputData = e.target.value.trim().toLowerCase();
           
        //-> token = user input
        tokens = await fetchSuggestions(inputData);
          ...
    )}
//API url    
const url = `https://api.coingecko.com/api/v3/search?query=${tokens}`;
```

### Endpoint for -> Token market data 
**Endpoint :** `https://api.coingecko.com/api/v3/coins/{id}?vs_currency={currency}&x_cg_demo_api_key=CG-aYXtZN18Pv6aGj3x2VVYiGfN`

**Description :** This endpoint is used to fetch detailed data about the user search, once submited. The {id} parameter should be replaced with the ID of the cryptocurrency. The suggestion list asure you to get the right id.

And the {currency} parameter should be replaced with the currency code in which the data of the coin should be displayed.
## Authors

- [@AadiDevv](https://www.github.com/AadiDevv)
