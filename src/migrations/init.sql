-- Create a table to log migrations. This table will track which migrations have been applied.
CREATE TABLE IF NOT EXISTS "MigrationLog" (
    migration_name TEXT PRIMARY KEY, -- The name of the migration. Used as the primary key.
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- The timestamp when the migration was applied. Defaults to the current timestamp.
);

INSERT INTO "MigrationLog" (migration_name) VALUES ('init');

-- Create a table for users. Each user has a unique ID, a name, and an optional email.
CREATE TABLE IF NOT EXISTS "user" (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each user. Auto-increments with each new user.
    name TEXT NOT NULL -- The name of the user. Cannot be NULL.
);

-- Create a table for portfolios. Each portfolio has a unique ID, a name, and an optional description.
CREATE TABLE IF NOT EXISTS "portfolio" (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each portfolio. Auto-increments with each new portfolio.
    name TEXT NOT NULL, -- The name of the portfolio. Cannot be NULL.
    current_value REAL DEFAULT 0, -- The current value of the portfolio.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- The timestamp when the portfolio was created. Defaults to the current timestamp.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- The timestamp when the portfolio was last updated. Defaults to the current timestamp.
    );

-- Create a junction table to represent the many-to-many relationship between users and portfolios.
CREATE TABLE IF NOT EXISTS "portfolio_user" (
    user_id INTEGER NOT NULL, -- Foreign key referencing the user ID. Cannot be NULL.
    portfolio_id INTEGER NOT NULL, -- Foreign key referencing the portfolio ID. Cannot be NULL.
    PRIMARY KEY (user_id, portfolio_id), -- Composite primary key consisting of user_id and portfolio_id.
    FOREIGN KEY (user_id) REFERENCES "user" (id), -- Foreign key constraint linking to the user table.
    FOREIGN KEY (portfolio_id) REFERENCES "portfolio" (id) ON DELETE CASCADE -- Foreign key constraint linking to the portfolio table.
);