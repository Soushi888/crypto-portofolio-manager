import DbService from '@services/DbService';
import { PortfolioModel } from '@models/portfolio.model';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	DbService.getInstance();
	const portfolioModel = new PortfolioModel();
	const portfolios = portfolioModel.getAllPortfolios();

	return {
		portfolios
	};
};

export const actions: Actions = {
	async createPortfolio({ request }) {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		const portfolioModel = new PortfolioModel();
		const result = portfolioModel.createPortfolio({ name });

		return {
			status: 200,
			result
		};
	},
	async deletePortfolio({ request }) {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const portfolioModel = new PortfolioModel();
		const result = portfolioModel.deletePortfolio({ id });
		return {
			status: 200,
			result
		};
	}
};
