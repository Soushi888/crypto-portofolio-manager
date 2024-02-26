import { coinDataLocalStorageStore, coinsListLocalStorageStore } from '@stores/coins.store';

interface IApiService {
	getCoinsMarketData(): Promise<any>;
	getCoinData(coinId: string): Promise<any>;
}

/**
 * ApiService is a class responsible for fetching and caching data from the CoinGecko API.
 * It implements a caching mechanism using LocalStorage to store fetched data, ensuring
 * that data is not fetched more frequently than once per minute to avoid exceeding API rate limits.
 */
export default class ApiService implements IApiService {
	private readonly baseUrl = 'https://api.coingecko.com/api/v3';
	private readonly requestInit: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			mode: 'no-cors'
		}
	};
	private fetch: typeof fetch;
	private lastFetchTime: number = 0;

	/**
	 * Constructor for the ApiService class.
	 *
	 * @param {typeof fetch} fetchFunction - The fetch function reference from the browser or SvelteKit Load function.
	 */
	constructor(fetchFunction: typeof fetch) {
		this.fetch = fetchFunction;
	}

	/**
	 * Fetches data from the given URL with a caching mechanism using LocalStorage.
	 * The method checks if the data is already cached and not older than  30 seconds.
	 * If the data is not cached or is older, it fetches the data from the API, updates the cache,
	 * and returns the fetched data.
	 *
	 * @param {string} url - The URL to fetch data from.
	 * @param {string} cacheKey - The key to store and retrieve cached data in LocalStorage.
	 * @return {Promise<any>} A Promise that resolves with the fetched data or rejects with an error if the fetch fails.
	 */
	private async fetchWithCache(url: string, cacheKey: string): Promise<any> {
		const timeLimit = 30 * 1000;
		const now = Date.now();
		const cachedData = localStorage.getItem(cacheKey);
		if (cachedData) {
			const { data, timestamp } = JSON.parse(cachedData);
			if (now - timestamp < timeLimit) {
				console.log(`Using cached data for ${url}`);
				return data;
			}
		}

		if (!cachedData && now - this.lastFetchTime < timeLimit) {
			return Promise.reject(new Error('API call rate limit exceeded'));
		}

		this.lastFetchTime = now;
		const response = await this.fetch(url, this.requestInit);
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();
		localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: now }));
		return data;
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
				`${this.baseUrl}/coins/${coinId}`,
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
				`${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
				'coinsMarketData'
			);
			coinsListLocalStorageStore.set(data);
		} catch (e) {}
	}
}
