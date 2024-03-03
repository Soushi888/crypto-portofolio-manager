import DbService from '@services/DbService';

export type Portfolio = {
  id?: string;
  name: string;
  current_value?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class PortfolioModel extends DbService {
  private readonly tableName = 'portfolio';
  private readonly junctionTableName = 'portfolio_stakeholder';

  constructor() {
    super();
  }

  createPortfolio(name: string) {
    this.db.transaction(() => {
      let stmt = this.db.prepare(`INSERT INTO ${this.tableName} (name) VALUES (?)`);
      const portfolioId = stmt.run(name).lastInsertRowid;

      stmt = this.db.prepare(
        `INSERT INTO ${this.junctionTableName} (portfolio_id, stakeholder_id) VALUES (?, ?)`
      );
      stmt.run(portfolioId, 1);
    })();
  }

  getAllPortfolios(): Portfolio[] {
    const stmt = this.db.prepare(`SELECT * FROM ${this.tableName}`);
    return stmt.all() as Portfolio[];
  }

  getPortfolio(id: string): Portfolio {
    const stmt = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`);
    return stmt.get(id) as Portfolio;
  }

  renamePortfolio(id: string, name: string) {
    const stmt = this.db.prepare(`UPDATE ${this.tableName} SET name = ? WHERE id = ?`);
    return stmt.run(name, id);
  }

  deletePortfolio(id: string) {
    const stmt = this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`);
    return stmt.run(id);
  }
}

const portfolioModel = new PortfolioModel();
export default portfolioModel;
