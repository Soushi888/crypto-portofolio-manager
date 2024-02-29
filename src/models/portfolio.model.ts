import DbService from '@services/DbService';

export type Portfolio = {
	id?: string;
	name: string;
	current_value?: string;
	created_at?: Date;
	updated_at?: Date;
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

	getPortfolio(id: string): Portfolio {
		const stmt = this.db.prepare('SELECT * FROM portfolio WHERE id = ?');
		return stmt.get(id);
	}

	renamePortfolio(id: string, name: string) {
		const stmt = this.db.prepare('UPDATE portfolio SET name = ? WHERE id = ?');
		return stmt.run(name, id);
	}

	deletePortfolio({ id }: { id: string }) {
		const stmt = this.db.prepare('DELETE FROM portfolio WHERE id = ?');
		return stmt.run(id);
	}
}
