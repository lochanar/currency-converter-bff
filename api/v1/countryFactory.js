const countryFactory = (countries, exchangeRates) => {
  countries.forEach((country) => {
    let currencies = country.currencies;
    const currenciesWithRates = currencies.map((currency) => {
      let currencyWithRates = {};
      currencyWithRates.code = currency.code;
      currencyWithRates.rate = exchangeRates[currency.code] / exchangeRates['SEK'];
      return currencyWithRates;
    });
    country.currenciesWithRates = currenciesWithRates;
  });
};

export default countryFactory;
