jest.mock('axios');
jest.mock('../currency-service');

import getCountryInfo from '../country-service';
import fetchExchangeRates from '../currency-service';
import axios from 'axios';
import { mockCountries, mockExchangeRates } from '../../mocks/mockData';

describe('test country service', () => {
  describe('with successful exchange rate call', () => {
    beforeEach(() => {
      fetchExchangeRates.mockResolvedValue(mockExchangeRates);
    });

    it('should return countries when all requests are OK', async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: mockCountries }));
      const countries = await getCountryInfo('united states of america');
      expect(countries).not.toBeNull();
      expect(countries[0].currenciesWithRates[0]).toStrictEqual({
        code: 'USD',
        rate: 1.2,
      });
    });

    it('should not return countries when countries request returns null', async (done) => {
      axios.get.mockImplementation(() => Promise.resolve({ data: null }));
      getCountryInfo('united states of america')
        .then(() => {
          fail('This cannot happen!');
          done();
        })
        .catch((e) => {
          expect(e).toStrictEqual(new TypeError(`Cannot read property 'forEach' of null`));
          done();
        });
    });

    it('should not return countries when countries request returns an empty array', async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
      const result = await getCountryInfo('united states of america');
      expect(result).toStrictEqual([]);
    });
  });

  describe('with unsuccessful exchange rate call', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: mockCountries });
    });

    it('should not return countries when exchange info is null', async (done) => {
      fetchExchangeRates.mockImplementation(() => Promise.resolve(null));
      getCountryInfo('united states of america')
        .then(() => {
          fail('This cannot happen!');
          done();
        })
        .catch((e) => {
          expect(e).toStrictEqual(new TypeError(`Cannot read property 'USD' of null`));
          done();
        });
    });

    it('should not return countries when exchange info is an empty object', async () => {
      fetchExchangeRates.mockImplementation(() => Promise.resolve({}));
      const result = await getCountryInfo('united states of america');
      expect(result[0].currenciesWithRates[0].rate).toBe(NaN);
    });

    it('should not return countries when exchange info call is rejected', async (done) => {
      fetchExchangeRates.mockImplementation(() => Promise.reject('Something bad happened!'));
      getCountryInfo('united states of america')
        .then(() => {
          fail('This cannot happen!');
          done();
        })
        .catch((e) => {
          expect(e).toBe('Something bad happened!');
          done();
        });
    });
  });
});
