import ApiService from '@services/apiService';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { coinsListStore } from '@/stores/coins.store';

export const load: PageLoad = async ({ fetch }) => {
	const apiService = new ApiService(fetch); //
	await apiService.getCoinsMarketData();

	return {
		coinsList: get(coinsListStore)
	};
};
