import DbService from '@services/DbService';

export type Portfolio = {
	id?: number;
	name: string;
	current_value?: string;
};

interface IPortfolioModel {
	createPortfolio(portfolio: Portfolio): void;
	getAllPortfolios(): Portfolio[];
}

export class PortfolioModel extends DbService implements IPortfolioModel {
	constructor() {
		super();
	}

	createPortfolio(portfolio: Portfolio) {
		const stmt = this.db.prepare('INSERT INTO portfolio (name) VALUES (?)');
		return stmt.run(portfolio.name);
	}

	getAllPortfolios(): Portfolio[] {
		const stmt = this.db.prepare('SELECT * FROM portfolio');
		return stmt.all();
	}

	deletePortfolio({ id }: { id: string }) {
		const stmt = this.db.prepare('DELETE CASCADE FROM portfolio WHERE id = ?');
		return stmt.run(id);
	}
}
