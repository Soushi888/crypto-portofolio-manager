import { coinDataStore, coinsListStore } from '@stores/coins.store';

interface IApiService {
	getCoinsMarketData(): Promise<any>;
	getCoinData(coinId: string): Promise<any>;
}

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

	/**
	 * Constructor for the API Service
	 *
	 * @param {typeof fetch} fetchFunction - The fetch function reference from the browser or SvelteKit Load function
	 */
	constructor(fetchFunction: typeof fetch) {
		this.fetch = fetchFunction;
	}

	async getCoinData(coinId: string): Promise<void> {
		try {
			const response = await this.fetch(`${this.baseUrl}/coins/${coinId}`, this.requestInit);
			if (!response.ok) {
				throw new Error('Failed to fetch coin data');
			}
			const data = await response.json();
			coinDataStore.set(data);
		} catch (e) {}
	}

	async getCoinsMarketData(): Promise<void> {
		try {
			const response = await this.fetch(
				`${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
				this.requestInit
			);
			if (!response.ok) {
				throw new Error('Failed to fetch coin list');
			}
			const data = await response.json();
			coinsListStore.set(data);
		} catch (e) {}
	}
}
