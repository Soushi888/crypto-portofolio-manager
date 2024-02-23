import { writable } from 'svelte/store';

type Coin = {
	id: string;
	name: string;
	symbol: string;
};

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
export const coinsStore = writable<Coin[]>([]);

export async function fetchCoinsMarkets(limit = 10) {
	const response = await fetch(
		`${COINGECKO_API_URL}/coins/list?x_cg_pro_api_key=${COINGECKO_API_KEY}`
	);
	const data = await response.json();
	coinsStore.set(data);
}
