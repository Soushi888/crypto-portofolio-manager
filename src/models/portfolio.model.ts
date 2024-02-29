import DbService from '@services/DbService';

export type Portfolio = {
	id?: string;
	name: string;
	current_value?: string;
	created_at?: Date;
	updated_at?: Date;
};

export class PortfolioModel extends DbService {
	constructor() {
		super();
	}

	createPortfolio(name: string) {
		const stmt = this.db.prepare('INSERT INTO portfolio (name) VALUES (?)');
		return stmt.run(name);
	}

	getAllPortfolios(): Portfolio[] {
		const stmt = this.db.prepare('SELECT * FROM portfolio');
		return stmt.all() as Portfolio[];
	}

	getPortfolio(id: string): Portfolio {
		const stmt = this.db.prepare('SELECT * FROM portfolio WHERE id = ?');
		return stmt.get(id) as Portfolio;
	}

	renamePortfolio(id: string, name: string) {
		const stmt = this.db.prepare('UPDATE portfolio SET name = ? WHERE id = ?');
		return stmt.run(name, id);
	}

	deletePortfolio(id: string) {
		const stmt = this.db.prepare('DELETE FROM portfolio WHERE id = ?');
		return stmt.run(id);
	}
}
