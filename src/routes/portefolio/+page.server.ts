import DbService, { PortfolioModel } from '@services/DbService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	DbService.getInstance();
	const portfolioModel = new PortfolioModel();
	const portfolio = await portfolioModel.getAllPortfolios();
	return {
		portfolio
	};
};
