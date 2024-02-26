import { coinDataStore, coinsListStore } from '@stores/coins.store';

interface IApiService {
	getCoinsMarketData(): Promise<any>;
	getCoinData(coinId: string): Promise<any>;
	// Add other methods as needed
}

export default class ApiService implements IApiService {
	private readonly baseUrl = 'https://api.coingecko.com/api/v3';
	private readonly apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
	private readonly requestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
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
		const response = await this.fetch(`${this.baseUrl}/coins/${coinId}`, this.requestInit);
		if (!response.ok) {
			throw new Error('Failed to fetch coin data');
		}
		const data = await response.json();
		coinDataStore.set(data);
	}

	async getCoinsMarketData(): Promise<void> {
		const response = await this.fetch(
			`${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false?x_cg_pro_api_key=${this.apiKey}`,
			this.requestInit
		);
		if (!response.ok) {
			throw new Error('Failed to fetch coin list');
		}
		const data = await response.json();
		coinsListStore.set(data);
	}
}
