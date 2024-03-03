import { coinDataLocalStorageStore, coinsListLocalStorageStore } from '@stores/coins.store';
import ApiService from './apiService';

interface ICoinGeckoApiService {
  getCoinsMarketData(): Promise<any>;
  getCoinData(coinId: string): Promise<any>;
}

export default class CoinGeckoApiService extends ApiService implements ICoinGeckoApiService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(fetchFunction: typeof fetch) {
    super(fetchFunction);
  }

  /**
   * Asynchronously fetches coin data for a specific coin ID and stores it in a local storage store.
   * The method uses the fetchWithCache method to ensure data is fetched and cached according to the caching rules.
   *
   * @param {string} coinId - The ID of the coin to fetch data for.
   * @return {Promise<void>} A Promise that resolves when the data is fetched and stored.
   */
  async getCoinData(coinId: string): Promise<void> {
    try {
      const data = await this.fetchWithCache(
        `${this.baseUrl}/coins/${coinId}?localization=false&community_data=false&developer_data=false&sparkline=true`,
        `coinData-${coinId}`
      );
      coinDataLocalStorageStore.set(data);
    } catch (e) {}
  }

  /**
   * Asynchronously fetches coins market data and stores it in a local storage store.
   * The method uses the fetchWithCache method to ensure data is fetched and cached according to the caching rules.
   *
   * @return {Promise<void>} A Promise that resolves when the data is fetched and stored.
   */
  async getCoinsMarketData(): Promise<void> {
    try {
      const data = await this.fetchWithCache(
        `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`,
        'coinsMarketData'
      );
      coinsListLocalStorageStore.set(data);
    } catch (e) {}
  }
}
