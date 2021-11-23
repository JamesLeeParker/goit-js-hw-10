import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

var debounce = require('lodash.debounce');

const bodyRef = document.querySelector('body');

const refs = {
  input: bodyRef.querySelector('#search-box'),
  ul: bodyRef.querySelector('.country-list'),
  div: bodyRef.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

const renderList = countries => {
  if (countries.message) return false;
  const markup = countries
    .map(({ flags, name }) => {
      return `<li><img src="${flags.svg}" alt="${name.official}">${name.official}</li>`;
    })
    .join('');
  resetTags();
  refs.ul.innerHTML = markup;
};

const renderOneCountry = countries => {
  const markup = countries
    .map(({ flags, name, capital, population, languages }) => {
      return `<h2><img src="${flags.svg}" alt="${name.official}">${name.official}</h2>
        <p><span>Capital:</span>${capital[0]}</p>
        <p><span>Population:</span>${population}</p>
        <p><span>Languages :</span>${Object.values(languages).map(lang => lang)}</p>`;
    })
    .join('');

  resetTags();
  refs.div.innerHTML = markup;
};

const searchCountry = e => {
  const serchingCountry = refs.input.value.trim();

  fetchCountries(serchingCountry)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (countries.length === 1) renderOneCountry(countries);
      else renderList(countries);
    })
    .catch(error => {
      console.log(error);
      resetTags();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};

const resetTags = () => {
  refs.div.innerHTML = '';
  refs.ul.innerHTML = '';
};

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
