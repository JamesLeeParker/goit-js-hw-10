import './css/styles.css';
// import fetchCountries from './fetchCountries';
const bodyRef = document.querySelector('body');

const inputRef = bodyRef.querySelector('#search-box');
const ulRef = bodyRef.querySelector('.country-list');
const divRef = bodyRef.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v2/all';

const fetchCountries = () => {
  return fetch(BASE_URL)
    .then(response => response.json())
    .then(countries => createMarkup(countries));
};

inputRef.addEventListener('input', () => fetchCountries);

const createMarkup = countries => {
  const markupList = countries
    .map(({ name, flags }) => {
      `<li><svg>${flags.svg}</svg>${name}</li>`;
    })
    .join('');
  ulRef.innerHTML = markupList;
};
