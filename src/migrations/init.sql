-- Create a table to log migrations. This table will track which migrations have been applied.
CREATE TABLE IF NOT EXISTS "MigrationLog" (
    migration_name TEXT PRIMARY KEY, -- The name of the migration. Used as the primary key.
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- The timestamp when the migration was applied. Defaults to the current timestamp.
);

-- Create a table for users. Each user has a unique ID, a name, and an optional email.
CREATE TABLE IF NOT EXISTS "user" (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each user. Auto-increments with each new user.
    name TEXT NOT NULL -- The name of the user. Cannot be NULL.
);

-- Create a table for portfolios. Each portfolio has a unique ID, a name, and an optional description.
CREATE TABLE IF NOT EXISTS "portfolio" (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each portfolio. Auto-increments with each new portfolio.
    name TEXT NOT NULL, -- The name of the portfolio. Cannot be NULL.
    description TEXT -- A description of the portfolio. Can be NULL.
);

-- Create a junction table to represent the many-to-many relationship between users and portfolios.
CREATE TABLE IF NOT EXISTS "portfolio_user" (
    user_id INTEGER NOT NULL, -- Foreign key referencing the user ID. Cannot be NULL.
    portfolio_id INTEGER NOT NULL, -- Foreign key referencing the portfolio ID. Cannot be NULL.
    PRIMARY KEY (user_id, portfolio_id), -- Composite primary key consisting of user_id and portfolio_id.
    FOREIGN KEY (user_id) REFERENCES "user" (id), -- Foreign key constraint linking to the user table.
    FOREIGN KEY (portfolio_id) REFERENCES "portfolio" (id) -- Foreign key constraint linking to the portfolio table.
);

-- Insert sample users into the user table.
INSERT INTO user (name) VALUES ('user1');
INSERT INTO user (name) VALUES ('user2');

-- Insert sample portfolios into the portfolio table.
INSERT INTO portfolio (name, description) VALUES ('portfolio 1', 'Description for Portfolio 1');
INSERT INTO portfolio (name, description) VALUES ('portfolio 2', 'Description for Portfolio 2');

-- Insert relationships into the portfolio_user table to represent which users manage which portfolios.
INSERT INTO portfolio_user (user_id, portfolio_id) VALUES (1, 1); -- user1 manages Portfolio 1
INSERT INTO portfolio_user (user_id, portfolio_id) VALUES (1, 2); -- user1 also manages Portfolio 2
INSERT INTO portfolio_user (user_id, portfolio_id) VALUES (2, 1); -- user2 manages Portfolio 1
