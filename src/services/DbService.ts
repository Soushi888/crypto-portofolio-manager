import Database from 'better-sqlite3';
import fs from 'fs';

export default class DbService {
	private static instance: DbService;
	db: Database;

	constructor() {
		this.db = new Database(import.meta.env.VITE_DB_PATH, { verbose: console.log });

		try {
			this.db.prepare('PRAGMA table_info(MigrationLog)').all();
			this.runMigration('init');
		} catch (error) {
			this.createMigrationLogTable();
			this.runMigration('init');
		}
	}

	public static getInstance(): DbService {
		if (!DbService.instance) {
			DbService.instance = new DbService();
		}
		return DbService.instance;
	}

	private createMigrationLogTable() {
		this.db
			.prepare(
				'CREATE TABLE IF NOT EXISTS MigrationLog (migration_name TEXT, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'
			)
			.run();
	}

	private runMigration(migrationName: string) {
		const migrationLog = this.db
			.prepare('SELECT * FROM MigrationLog WHERE migration_name = ?')
			.get(migrationName);

		if (!migrationLog) {
			const migrationPath = `./migrations/${migrationName}.sql`;
			// Read the migration file
			const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

			// Execute the migration
			this.db.exec(migrationSQL);

			// Log the migration as applied
			this.db.prepare('INSERT INTO MigrationLog (migration_name) VALUES (?)').run(migrationName);

			console.log('Initial migration completed successfully.');
		} else {
			console.log('Initial migration has already been applied.');
		}
	}
}

export type Portfolio = {
	id?: number;
	name: string;
	description: string;
};

export class PortfolioModel extends DbService {
	constructor() {
		super();
	}

	createPortfolio(portfolio: Portfolio) {
		const stmt = this.db.prepare('INSERT INTO portfolio (name, description) VALUES (?, ?)');
		stmt.run(portfolio.name, portfolio.description);
	}

	getAllPortfolios() {
		const stmt = this.db.prepare('SELECT * FROM portfolio');
		return stmt.all();
	}
}
