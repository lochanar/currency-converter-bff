import axios from 'axios';
import config from 'config';
import fetchExchangeRates from './currency-service';
import countryFactory from '../countryFactory';

const COUNTRY_SERVICE_URL = config.get('COUNTRY_SERVICE_URL');

const getCountryInfo = async (name) => {
  const url = `${COUNTRY_SERVICE_URL}/name/${name}`;
  return new Promise((resolve, reject) => {
    fetchExchangeRates()
      .then((exchangeRates) =>
        axios
          .get(url)
          .then((response) => {
            let countries = response.data;
            try {
              countryFactory(countries, exchangeRates);
              resolve(countries);
            } catch (e) {
              reject(e);
            }
          })
          .catch((err) => {
            reject(err);
          }),
      )
      .catch(reject);
  });
};

export default getCountryInfo;
