import ApiService from '@services/apiService';
import type { PageLoad } from './$types';
import { coinDataLocalStorageStore, coinsListLocalStorageStore } from '@/stores/coins.store';
import { get } from 'svelte/store';

export const load: PageLoad = async ({ params, fetch }) => {
	const apiService = new ApiService(fetch);
	await apiService.getCoinData(params.id);
	return get(coinDataLocalStorageStore);
};
