import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v2/name';
  return fetch(`${BASE_URL}/${name}`).then(response => response.json());
}
