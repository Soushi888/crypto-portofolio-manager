import { fetchCoinsMarkets } from '../stores/coins.store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({}) => {
	await fetchCoinsMarkets();
};
