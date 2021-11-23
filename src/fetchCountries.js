import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name';

  return fetch(`${BASE_URL}/${name}`).then(response => {
    console.log(response);
    if (response.status === 404) {
      return Promise.reject(new Error('ERROR!'));
    }
    return response.json();
  });
}
