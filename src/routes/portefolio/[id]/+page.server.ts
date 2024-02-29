import { PortfolioModel } from '@models/portfolio.model';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const portfolioModel = new PortfolioModel();
	return portfolioModel.getPortfolio(params.id);
};
