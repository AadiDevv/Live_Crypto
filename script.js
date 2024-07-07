// HTML to JS
    //gen
    const introTextEl =document.querySelector('.introduction__text');

    //nav
    const currencyChoiceEl = document.querySelector('#nav__currency-choice');
    //search section
    const formEl = document.querySelector('form');
    const inputEl = document.querySelector('.form__input');
    const suggestionsEl = document.querySelector('.suggestions');
    const btnEl = document.querySelector('.form__submit');
    //table section
    const tableSectionEl = document.querySelector('.table');
    const tableContainerEl =  document.querySelector('.table__container');
    const tableWidthEl =document.querySelector('.table__width');
    const scrollDivEL=document.querySelector('.table__scroll');

    //other info
    const cryptoContainerEl = document.querySelector('.crypto');

//VAR
    let inputData = '';

    let searchSuccessful = false;
    let refreshInterval;

//CURRENCY CHOICE
    let currency = currencyChoiceEl.value;
    let currencyLogo = getCurrencySymbol(currency);
    currencyChoiceEl.addEventListener('change', () => {
        currency = currencyChoiceEl.value;
        currencyLogo = getCurrencySymbol(currency);
        getCrypto();
    });
    function getCurrencySymbol(currencyCode) {
        const symbols = {
            'usd': '$',
            'eur': '€',
            'gbp': '£',
            'jpy': '¥',
            'cny': '¥',
            'inr': '₹',
            // Add more currencies as needed
        };
        return symbols[currencyCode.toLowerCase()] || currencyCode.toUpperCase();
    }
    
 
//SUBMISSION
    // Event listener for form submission
    formEl.addEventListener('submit', (e)=>{
        e.preventDefault();
        inputData = inputEl.value.trim().toLowerCase();
        getCrypto(inputData);
        inputEl.value = '';
    })
    //Fetch fuction to get the crypto data
    const getCrypto = async function(crypto){

        const url = `https://api.coingecko.com/api/v3/coins/${crypto}?vs_currency=${currency}&x_cg_demo_api_key=CG-aYXtZN18Pv6aGj3x2VVYiGfN`;

       
        try {

        let requete = await fetch(url,{
            method : 'GET'
        });
            if (!requete.ok) {
                console.log('error');
            }
            else{
                let data = await requete.json();

                //DATA OF THE TOKEN
                    //General
                    let tknName = data.name;
                    let tknShortName = data.symbol.toUpperCase();
                    let tknPrice = data.market_data.current_price[currency];
                    let tknIconUrl = data.image.thumb;
                    //Market cap
                    let tknMarketRank = data.market_cap_rank;
                    //Prices
                        //variations %
                        let tknPriceChangeD = data.market_data.price_change_percentage_24h;
                        let tknPriceChangeW = data.market_data.price_change_percentage_7d;
                        let tknPriceChangeM = data.market_data.price_change_percentage_30d;
                        let tknPriceChangeY = data.market_data.price_change_percentage_1y;
                        
                        //All time highest (ATH) and lowest (ATL)
                        let tknATH = data.market_data.ath[currency];
                        let tknATL = data.market_data.atl[currency];

                    //Capitalisation & Volume 24h
                        let tknCapital = data.market_data.market_cap[currency];
                        let tknTradVol24h = data.market_data.total_volume[currency];
                        let tknCapVol24h = data.market_data.market_cap_change_percentage_24h;
                        let tknVolumeTotal = data.market_data.total_volume[currency];
                    //Total supply
                    let tknTotalSupply = data.market_data.total_supply;
                    let tknCirculeSupply = data.market_data.circulating_supply;
                    //Creation date
                    let tknCreaDate = data.genesis_date;
                    //Tkn decription
                    let tknDescription = data.description.en;
                    //Tkn links
                    let tknHomePage = data.links.homepage[0];
                    let tknReddit = data.links.subreddit_url;

                //clear from previous data
                cryptoContainerEl.innerHTML= '';
                tableContainerEl.innerHTML='';
                //IMPLIMENT DATA TO HTML
                    // General
                        //name
                        let cryptoNameEl = document.createElement('div');
                        cryptoNameEl.innerHTML = `<h2 class="crypto__name"><img src="${tknIconUrl}">${tknName}<span class="crypto__name-short">(${tknShortName})</span></h2>`;
                        cryptoContainerEl.appendChild(cryptoNameEl);
                        //price
                        let cryptoPriceEl = document.createElement('div');
                        cryptoPriceEl.classList.add('crypto__price')
                        cryptoPriceEl.innerHTML = `<div class="crypto__info-price">${tknPrice}${currencyLogo}</div>`;
                        cryptoContainerEl.appendChild(cryptoPriceEl);
                    //Tab
                   
                        // price change Tab
                        function tab1(){
                            let header = ['Period','Price Change'];
                            let row1 = ['24h Change',tknPriceChangeD.toFixed(2)+' %'];
                            let row2 = ['7d Change',tknPriceChangeW.toFixed(2)+' %'];
                            let row3 = ['30d Change',tknPriceChangeM.toFixed(2)+' %'];
                            let row4 = ['1y Change',tknPriceChangeY.toFixed(2)+' %'];
                            createTab('priceChange',header,row1,row2,row3,row4);
                        };
                        tab1();
                        // market data Tab
                        let header = ['Category',`Devise (${currency.toUpperCase()})`];
                        let row1 = [`Market Capitalization `,formatNumber(tknCapital)];
                        let row2 = [`24h Trading Volume`,formatNumber(tknTradVol24h)];
                        let row3 = ['24h Market Cap Change (%)',tknCapVol24h.toFixed(2)+' %'];
                        let row4 = [`Total Volume`,formatNumber(tknVolumeTotal)];
                        createTab('market',header,row1,row2,row3,row4);

                       
                    //Details
                        let cryptoDetailsEl = document.createElement('div');
                        cryptoDetailsEl.classList.add('crypto__details');
                        cryptoDetailsEl.innerHTML = `
                            <p><strong>Market Cap Rank:</strong> <span class="crypto__rank" >${tknMarketRank}</span></p>
                            <p><strong>24h Volume:</strong> <span class="crypto__volume-24h" >${formatNumber(tknVolumeTotal)}${currencyLogo}</span></p>
                            <p><strong>Total Supply:</strong> <span class="crypto__total-supply" >${formatNumber(tknTotalSupply)}</span></p>
                            <p><strong>Circulating Supply:</strong> <span class="crypto__circulating-supply" >${formatNumber(tknCirculeSupply)}</span></p>
                            <p><strong>Genesis Date:</strong> <span class="crypto__genesis-date">${tknCreaDate}</span></p>
                            <p><strong>Homepage:</strong> <a class="crypto__homepage" href="${tknHomePage}"  target="_blank">${tknHomePage}</a></p>
                            <p><strong>Reddit:</strong> <a class="crypto__reddit" href="${tknReddit}"  target="_blank">${tknReddit}</a></p>
                            
                        `;
                        cryptoContainerEl.appendChild(cryptoDetailsEl);
                    //Description
                    let cryptoDescEl = document.createElement('div');
                    cryptoDescEl.classList.add('crypto__description');
                    cryptoDescEl.innerHTML = 
                    `<p class="crypto__description">${tknDescription}</p>`;
                    cryptoContainerEl.appendChild(cryptoDescEl);
                        
                    scrollBehavior();
                // Hide intro text and refresh data
                    searchSuccessful = true;
                    refresh(crypto);
                    updateIntroText();
                }
            
        } catch (error) {

            // Clear previous content
            cryptoContainerEl.innerHTML = '';

            // Display error message
            const errorMsg = document.createElement('span');
            errorMsg.textContent = 'Token not found or Syntax error.';
            cryptoContainerEl.appendChild(errorMsg);
        }
    }
    
    //Keep the price info Live
   const refresh = (crypto) => {
    // avoid accumulation and interval overload
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
    refreshInterval = setInterval(() => {
        if (searchSuccessful) {
            getCrypto(crypto);
        }
    }, 1500);
};
//INTRO TEXT
    // if a token was searched 
    const updateIntroText = () => {
        if (searchSuccessful) {
            introTextEl.style.display = 'none';
        } else {
            introTextEl.style.display = 'block';
        }
    };
    // Initial check to hide or show intro text
    updateIntroText();

// SUGGESTION list
    //event input
    inputEl.addEventListener('input',async(e)=>{
        //ut input correction
        inputData = e.target.value.trim().toLowerCase();
        if(inputData.length >=2){ 
            suggestionsEl.style.display='block';
            const tokens = await fetchSuggestions(inputData);
            displayList(tokens); 
        }else{
            suggestionsEl.style.display='none'
        }
        
    })
    //function fetch
    const fetchSuggestions = async(tokens)=>{
        let url = `https://api.coingecko.com/api/v3/search?query=${tokens}`;

        try {
            const request = await fetch(url);
            if (!request.ok) {
                console.log('Error while fetch API');
                return;
            }else{
                data = await request.json();
                return data.coins.map( coins => coins.id);
            }
        } catch (error) {
            console.log('Error while fetching')
        }
       

        // return fetch(url)
        // .then(response =>{
        //     return response.json();
        // })
        // .then(data =>{
        //     return data.coins.map(coin=> coin.id);
        // })
    }
    //function display
    const displayList = (tokens)=>{
        suggestionsEl.innerHTML='';
        const maxSuggestion = 5;
        for(let i=0; i<tokens.length &&  i<maxSuggestion ; i++){
           
                const item = document.createElement('div');
                item.classList.add('form__suggestion-item');
                item.textContent = tokens[i];
                suggestionsEl.appendChild(item);
    
                item.addEventListener('click',()=>{
                    inputEl.value = tokens[i];
                    suggestionsEl.style.display='none'
                });
            
            
        }
       
        // suggestionsEl.style.display='block';

    }
    //Close suggestion list when we click somwhere else
    document.addEventListener('click',(e)=>{
        if (!suggestionsEl.contains(e.target) && !inputEl.contains(e.target) && !btnEl.contains(e.target)) {
            suggestionsEl.style.display = 'none';
            inputEl.value = '';

        }
    })

// UTILITY FUNCTIONS 
    //format display of numbers 
    function formatNumber(num) {
        if(num>= 1.0e+12){
            return (num/1.0e+12).toFixed(2) + 'T';
        };
        if (num >= 1.0e+9) {
            return (num/1.0e+9).toFixed(2) + 'B';
        };
        if (num >= 1.0e+6) {
            return (num/1.0e+6).toFixed(2) + 'M';
        };
        if (num >= 1.0e+3) {
            return (num/1.0e+3).toFixed(2) + 'k';
        };
        return num.toFixed(2);
    }
    //create a tab
    function createTab(tbName,headers,...rows){
        //Creating El of Table
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        //Table Header
            let headerRow = document.createElement('tr');
            headers.forEach((header,headerIndex)=>{
                //th uppdate
                let th = document.createElement('th');
                th.classList.add(`tbHeader_head${headerIndex+1}`)
                th.textContent=header;
                //th append
                headerRow.appendChild(th);
            })
            //Appending
            thead.appendChild(headerRow)
            table.appendChild(thead);

        //Table Body
            rows.forEach((row,rowIndex) => {
                //1 tr for each row -> rows[row]
                let bodyRow = document.createElement('tr');
                bodyRow.classList.add(`tbBody_row${rowIndex+1}`);

                row.forEach((cell,cellIndex)=>{
                    //creating td 
                    let td = document.createElement('td');
                    td.classList.add(`tbBody_row${rowIndex+1}-cell${cellIndex+1}`);
                    td.textContent = cell;
                    //append td
                    bodyRow.appendChild(td);
                })
                tbody.appendChild(bodyRow);
            });
            table.appendChild(tbody);

        //  //create the div to contain the table
         table.classList.add(`table__${tbName}`);
         table.id = `table__${tbName}`;
         //append to div
         tableContainerEl.appendChild(table);
      
    }

    // FOR STYLING
    // the scrolling when we click either on price variation or market cap
    function scrollBehavior(){
        const aPrice = document.querySelector('.price_choice');
        const aMarket = document.querySelector('.market_choice');
        const tbPrice = document.querySelector('.table__priceChange');
        const tbMarket = document.querySelector('.table__market');

        aPrice.addEventListener('click',(e)=>{
            e.preventDefault();
            tbPrice.scrollIntoView({behavior:'smooth', block:'end' });
        })
        aMarket.addEventListener('click',(e)=>{
            e.preventDefault();
            tbMarket.scrollIntoView({behavior:'smooth', block:'end' });
        })
    }
