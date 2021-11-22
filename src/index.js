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
    .map(({ flag, name }) => {
      return `<li><img src="${flag}" alt="${name}">${name}</li>`;
    })
    .join('');
  resetTags();
  refs.ul.innerHTML = markup;
};

const renderOneCountry = countries => {
  const markup = countries
    .map(({ flag, name, capital, population, languages }) => {
      return `<h2><img src="${flag}" alt="${name}">${name}</h2>
        <p><span>Capital:</span>${capital}</p>
        <p><span>Population:</span>${population}</p>
        <p><span>Languages :</span>${languages.map(lang => lang.name)}</p>`;
    })
    .join('');
  resetTags();
  refs.div.innerHTML = markup;
};

const searchCountry = e => {
  const serchingCountry = refs.input.value.trim();
  if (serchingCountry.length < 2) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else {
    fetchCountries(serchingCountry).then(countries => {
      if (countries.length === 1) renderOneCountry(countries);
      else if (countries.status === 404) {
        resetTags();
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else renderList(countries);
    });
  }
};

const resetTags = () => {
  refs.div.innerHTML = '';
  refs.ul.innerHTML = '';
};

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
