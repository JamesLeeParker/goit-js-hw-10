import './css/styles.css';
// import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const BASE_URL = 'https://restcountries.com/v3.1/name';

const fetchCountries = (name = '/') => {
  return fetch(BASE_URL + name).then(countri => console.log(countri.json()));
};

fetchCountries('/france').then(data => console.log(data));
