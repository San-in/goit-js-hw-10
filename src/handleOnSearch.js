
const ENDPOINT = 'https://restcountries.com/v3.1/name';
const SEARCH_OPTIONS = 'fields=name,capital,population,flags,languages';
import Notiflix from 'notiflix';

const refs = {
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

export default function handleOnSearch (event) {
    const searchName = event.target.value.trim();
    if(searchName){
        fetchCountries(searchName)
        .then(renderPage)
        .catch((error) => {
            clearInput();
            return Notiflix.Notify.failure(error.message);});
    } else {
        Notiflix.Notify.warning('Field can\`t be empty');
        clearInput();
    }
}

function fetchCountries (name) {
return fetch(`${ENDPOINT}/${name}?${SEARCH_OPTIONS}`)
.then(response => {
    if(!response.ok) {
        throw new Error('Oops, there is no country with that name');
    }
    return response.json();
}).catch('Oops, there is no country with that name');
}

function renderPage (countries) {
    if(countries.length > 10) {
        clearInput();
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }
    if(countries.length > 1) {
        renderList(countries);
        return;
    }     
    if(countries.length === 1){
        renderItem(countries);
        return;
    }
}

function renderList (countriesArray) {
    clearInput();
        countriesArray.map(({name, flags}) => {
            const markupByList = `<li class="country-item"><img src="${flags.svg}" alt="flag" width="50"/>  <span>${name.official}</span></li>`;
            refs.countryList.insertAdjacentHTML('beforeend',markupByList);
    });
}

function renderItem (countriesArray) {
    refs.countryList.innerHTML = '';
        countriesArray.map(({name,capital,population,flags,languages}) => {
            const allLanguages = Object.values(languages).join(', ');
            const markupByItem = `<div class="country-info__label"><img src="${flags.svg}" alt="flag" width="60" class="country-info__img"><h2 class="country-info__title">${name.official}</h2></div><ul class="country-info__list"><li class="country-info__capital">Сapital: ${capital}</li><li class="country-info__population">Population: ${population}</li><li class="country-info__languages">Languages: ${allLanguages}</li>
            </ul>`;
            refs.countryInfo.innerHTML = markupByItem ;
    });
}

function clearInput() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}
