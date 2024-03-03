import portfolioModel from '@models/portfolio.model';
import type { Actions, PageServerLoad } from './$types';
import coinModel from '@models/coin.model';

export const load: PageServerLoad = async ({ params }) => {
  const portfolioCoinsList = coinModel.getAllPortfolioCoins(params.id);
  return { ...portfolioModel.getPortfolio(params.id), coinsList: portfolioCoinsList };
};

export const actions: Actions = {
  addCoin: async ({ request }) => {
    const formData = await request.formData();
    const portfolioId = formData.get('portfolio_id') as string;
    const coinName = formData.get('coin_name') as string;

    const result = coinModel.addCoin({
      name: coinName,
      symbol: coinName,
      portfolio_id: portfolioId
    });

    return {
      status: 200,
      result
    };
  }
};
