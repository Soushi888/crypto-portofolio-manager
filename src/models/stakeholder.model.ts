import DbService from '@services/DbService';

export type Stakeholder = {
  id?: string;
  name: string;
};

class StakeholderModel extends DbService {
  private readonly tableName = 'stakeholder';
  // private readonly junctionTableName = 'stakeholder_';

  constructor() {
    super();
  }

  createStakeholder(name: string) {
    let stmt = this.db.prepare(`INSERT INTO ${this.tableName} (name) VALUES (?)`);
    return stmt.run(name);
  }

  getAllStakeholders(): Stakeholder[] {
    const stmt = this.db.prepare(`SELECT * FROM ${this.tableName}`);
    return stmt.all() as Stakeholder[];
  }

  getStakeholder(id: string): Stakeholder {
    const stmt = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`);
    return stmt.get(id) as Stakeholder;
  }

  renameStakeholder(id: string, newName: string) {
    const stmt = this.db.prepare(`UPDATE ${this.tableName} SET name = ? WHERE id = ?`);
    return stmt.run(newName, id);
  }

  deleteStakeholder(id: string) {
    const stmt = this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`);
    return stmt.run(id);
  }
}

const stakeholderModel = new StakeholderModel();
export default stakeholderModel;
