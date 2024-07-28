// HTML to JS
    //gen
    const introTextEl =document.querySelector('.introduction__text');
    const introSecEl = document.querySelector('.introduction');

    //nav
    const currencyChoiceEl = document.querySelector('#nav__currency-choice');
    const burgerButtonEl = document.querySelector('.burger-button');
    const burgerIconEl = document.querySelector('#burger-icon');
    const burgerMenuEl = document.querySelector('.burger-menu__container');
    //search section
    const formEl = document.querySelector('form');
    const inputEl = document.querySelector('.form__input');
    const suggestionsEl = document.querySelector('.suggestions');
    const btnEl = document.querySelector('.form__submit');
    //table section
    const tableSectionEl = document.querySelector('.table');
    const tbChoiceContainer = document.querySelector('.table__choice-container')
    const tbChoiceEl = document.querySelectorAll('.table__span');
    const tableContainerEl =  document.querySelector('.table__container');
    const tableWidthEl =document.querySelector('.table__width');
    const scrollDivEL=document.querySelector('.table__scroll');


    //other info
    const cryptoContainerEl = document.querySelector('.crypto');
    const cryptoContainer2El = document.querySelector('.crypto2');
    const cryptoDescEl = document.querySelector('.crypto__description')
    const button = document.querySelector('.description__btn');


//VAR
    let inputData = '';

    let searchSuccessful = false;
    let newCryptoSearch = true;
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
    function submitForm(e){
        e.preventDefault();
        inputData = inputEl.value.trim().toLowerCase();
        newCryptoSearch = true;
        getCrypto(inputData);
        inputEl.value = '';
    }
    formEl.addEventListener('submit',submitForm)
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
                    let tknIconUrl = data.image.large;
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
                cryptoContainer2El.innerHTML= '';
                cryptoContainerEl.innerHTML= '';
                tableContainerEl.innerHTML='';
                //display the section
                // cryptoContainerEl.classList.add('section-marge');
                cryptoContainer2El.classList.add('section-marge');

               
                //IMPLIMENT DATA TO HTML
                    // General
                        
                        let cryptoNamePriceEl = document.createElement('div');
                        cryptoNamePriceEl.classList.add('crypto__nameAndprice')
                        //name
                        let cryptoNameEl = document.createElement('h2');
                        cryptoNameEl.classList.add('crypto__name');
                        cryptoNameEl.innerHTML = `<img class="crypto__name-icon" src="${tknIconUrl}"><p>${tknName}</p><span class="crypto__name-short">(${tknShortName})</span>`;
                        cryptoNamePriceEl.appendChild(cryptoNameEl);
                        //price
                        let cryptoPriceEl = document.createElement('div');
                        cryptoPriceEl.classList.add('crypto__price-container')
                        cryptoPriceEl.innerHTML = `
                        <h2 class="crypto__price">${tknPrice.toLocaleString('fr-FR')}<span class="crypto__price-devise">${currencyLogo}</span></h2>
                        <span class="crypto__price-change-container">
                            <p class="crypto__price-change">${tknPriceChangeD.toFixed(2)} %</p>
                            <p class="crypto__price-change-laps">24h</p>
                        </span>
                        `;
                        cryptoNamePriceEl.appendChild(cryptoPriceEl);
                        cryptoContainer2El.appendChild(cryptoNamePriceEl);
                        //apply color for changing data
                        let a = document.querySelector('.crypto__price-change');
                        dataChangeColor(tknPriceChangeD,a); 

                    //Tab
                   
                        // price change Tab
                        const tab1 = ()=>{
                            let header = ['Period','Price Change'];
                            let row1 = ['24h Change',tknPriceChangeD.toFixed(2)+' %'];
                            let row2 = ['7d Change',tknPriceChangeW.toFixed(2)+' %'];
                            let row3 = ['30d Change',tknPriceChangeM.toFixed(2)+' %'];
                            let row4 = ['1y Change',tknPriceChangeY.toFixed(2)+' %'];
                            createTab('priceChange',header,row1,row2,row3,row4);
                            //Giving color red or green for the positif or negativ data
                            const priceChange = [tknPriceChangeD,tknPriceChangeW,tknPriceChangeM,tknPriceChangeY];
                            priceChange.forEach((data,i)=>{
                                const cell = document.querySelector(`.tbBody_row${i+1}-cell2`);
                                dataChangeColor(data,cell);
                            })
                        };
                        tab1();
                        // market data Tab
                        const tab2 = ()=>{
                            let header = ['Category',`Devise (${currency.toUpperCase()})`];
                            let row1 = [`Market Capitalization `,formatNumber(tknCapital)];
                            let row2 = [`24h Trading Volume`,formatNumber(tknTradVol24h)];
                            let row3 = ['24h Market Cap Change (%)',tknCapVol24h.toFixed(2)+' %'];
                            let row4 = [`Total Volume`,formatNumber(tknVolumeTotal)];
                            createTab('market',header,row1,row2,row3,row4);
                        };
                        tab2();     
                    //Details
                       
                        let cryptoDetailsEl = document.createElement('div');
                        cryptoDetailsEl.classList.add('crypto__details');
                        cryptoDetailsEl.innerHTML = `
                            <div class="crypto__details-title">Market information for ${tknShortName} :</div>
                            <p><strong>Market Cap Rank :</strong> <span class="crypto__rank" >${tknMarketRank}</span></p>
                            <p><strong>24h Volume :</strong> <span class="crypto__volume-24h" >${formatNumber(tknVolumeTotal)}${currencyLogo}</span></p>
                            <p><strong>Total Supply :</strong> <span class="crypto__total-supply" >${formatNumber(tknTotalSupply)}</span></p>
                            <p><strong>Circulating Supply :</strong> <span class="crypto__circulating-supply" >${formatNumber(tknCirculeSupply)}</span></p>
                            <p><strong>Genesis Date :</strong> <span class="crypto__genesis-date">${tknCreaDate}</span></p>
                            <p><strong>Homepage :</strong> <a class="crypto__homepage" href="${tknHomePage}"  target="_blank">${tknHomePage}</a></p>
                            <p><strong>Reddit :</strong> <a class="crypto__reddit" href="${tknReddit}"  target="_blank"><img class="icon_reddit" src="./styles/Medias/reddit-logo-2436.png" alt="Reddit Icon"></a></p>
                            
                        `;
                        cryptoContainerEl.appendChild(cryptoDetailsEl);
                    //Description
                   
                        if(newCryptoSearch){
                            cryptoDescEl.innerHTML='';
                            cryptoDescEl.textContent = tknDescription;
                            // handleDescripton(tknDescription,cryptoDescEl);
                        }
                    
                    // cryptoDescEl.innerHTML = 
                    // `<p>${tknDescription}</p>`;
                    scrollBehavior();
                    //Update search status
                    searchSuccessful = true;
                    newCryptoSearch = false;
                    // Hide intro text and refresh data
                    refresh(crypto);
                    updateIntroText();
                    tbChoice();
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
            suggestionsEl.style.display='none';
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
                return data.coins.map(coin => ({
                    id: coin.id,
                    icon: coin.large 
                }));
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

                let img = document.createElement('img');
                img.src = tokens[i].icon;
                img.alt = 'icon';
                img.classList.add('icon');

                let text = document.createElement('span');
                text.textContent = tokens[i].id;
                

                item.appendChild(img);
                item.appendChild(text) 
                
                suggestionsEl.appendChild(item);
    
                item.addEventListener('click',(e)=>{
                    inputEl.value = tokens[i].id;
                    submitForm(e);
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

//TABS
    //when succesful surch display tab choice
    function tbChoice (){
        if(searchSuccessful){
            tbChoiceContainer.style.display = 'flex';
        }else{
            tbChoiceContainer.style.display = 'none';
        }
    };
    // tbChoice();

    tbChoiceEl.forEach(element=>{
        element.addEventListener('click',(event)=>{
            event.preventDefault();
            tbChoiceEl.forEach(el=> el.classList.remove('active'));
            event.target.classList.toggle('active');
        })
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
                    td.classList.add('cell')
                    td.classList.add(`cell${cellIndex+1}`);
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
         table.classList.add('tables');
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
    scrollBehavior();
    function dataChangeColor(data,htmlEL){
            let arrowNeg = document.createElement('span');
            let arrowPos = document.createElement('span');
            arrowNeg.classList.add('triangle-down');
            arrowPos.classList.add('triangle-up')


            if(data < 0){
                htmlEL.classList.remove('positive');
                htmlEL.classList.add('negative');
                htmlEL.appendChild(arrowNeg);
                
            }else if(data > 0){
                htmlEL.classList.remove('negative');
                htmlEL.classList.add('positive');
                htmlEL.appendChild(arrowPos);
            }else{
                htmlEL.classList.remove('negative');
                htmlEL.classList.remove('positive');
            }
        }
    // function handleDescripton(description, cryptoContainerEl){      
    //     const maxLength = 400;

    //     if(description.length <= maxLength){
    //         cryptoContainerEl.textContent = description;
    //         return;
    //     }
         
    //     const shortText = description.slice(0,maxLength)+'...';
    //     const longText = description;

    //     // cryptoContainerEl.textContent = shortText;
    //     button.style.display='block';
    //    
    //     function handleBtn(){
    //         if(button.textContent === 'see more'){
    //             cryptoContainerEl.textContent = longText;
    //             button.textContent = 'see less';
    //         }else if(button.textContent === 'see less'){
    //             cryptoContainerEl.textContent = shortText;
    //             button.textContent = 'see more';
    //         }
    //     }
    //     button.removeEventListener('click',handleBtn);
    //     button.addEventListener('click',handleBtn);
        
    // }
    // NAV
        // Burger menu
            // open/close
            function handleBurgerMenu(){
                burgerMenuEl.classList.toggle('open');
                    const isOpen = burgerMenuEl.classList.contains('open');
                    burgerIconEl.classList = isOpen? 'fa-solid fa-xmark':'fa-solid fa-bars'
            }
            burgerButtonEl.addEventListener('click',handleBurgerMenu);       
            // close when menu-tabs clicked
            const menuTabsEl = document.querySelectorAll('.burger-menu__a');
            menuTabsEl.forEach(el=>{
                el.addEventListener('click',handleBurgerMenu);
            })