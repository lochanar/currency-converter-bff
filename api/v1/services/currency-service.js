import config from 'config';
import axios from 'axios';

const CURRENCY_SERVICE_URL = config.get('CURRENCY_SERVICE_URL');

let exchangeRates = null;
let lastUpdate = 0;
const TTL = config.get('TTL');

const fetchExchangeRates = async () => {
  return new Promise((resolve, reject) => {
    let currentTime = +new Date();
    if (exchangeRates && lastUpdate + TTL > currentTime) {
      resolve(exchangeRates);
    } else {
      axios
        .get(CURRENCY_SERVICE_URL)
        .then((response) => {
          lastUpdate = currentTime;
          exchangeRates = response.data.rates;
          resolve(exchangeRates);
        })
        .catch(reject);
    }
  });
};

export default fetchExchangeRates;
