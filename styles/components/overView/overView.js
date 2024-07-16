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