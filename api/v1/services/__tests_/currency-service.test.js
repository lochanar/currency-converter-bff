jest.mock('axios');

import fetchExchangeRates from '../currency-service';
import axios from 'axios';
import { mockFexerResponse } from '../../mocks/mockData';

describe('test currency service', () => {
  describe('with unsuccessful api call', () => {
    beforeEach(() => {
      axios.get.mockRejectedValue('Something went wrong!');
    });
    it('should not return exchange rates', async () => {
      expect(fetchExchangeRates()).rejects.toBe('Something went wrong!');
    });
  });

  describe('with successful api call', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: mockFexerResponse });
    });
    it('should return exchange rates', async () => {
      const response = await fetchExchangeRates();
      expect(response).toStrictEqual(mockFexerResponse.rates);
    });
    it('should return exchange rates from cache', async () => {
      let response = await fetchExchangeRates();
      expect(response).toStrictEqual(mockFexerResponse.rates);

      axios.get.mockResolvedValue(null);
      response = await fetchExchangeRates();
      expect(response).toStrictEqual(mockFexerResponse.rates);
    });
  });
});
