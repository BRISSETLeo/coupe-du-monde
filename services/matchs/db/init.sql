CREATE DATABASE IF NOT EXISTS matchs_db;
USE matchs_db;

CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    logo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS matchs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team1_id INT NOT NULL,
    team2_id INT NOT NULL,
    score1 INT DEFAULT 0,
    score2 INT DEFAULT 0,
    match_date DATETIME NOT NULL,
    status ENUM('scheduled', 'in_progress', 'finished', 'cancelled') DEFAULT 'scheduled',
    stadium VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (team1_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (team2_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Insert sample teams
INSERT INTO teams (name, country, logo) VALUES
    ('France', 'France', 'https://example.com/france.png'),
    ('Brésil', 'Brésil', 'https://example.com/brazil.png'),
    ('Allemagne', 'Allemagne', 'https://example.com/germany.png'),
    ('Argentine', 'Argentine', 'https://example.com/argentina.png');

-- Insert sample matches
INSERT INTO matchs (team1_id, team2_id, score1, score2, match_date, status, stadium) VALUES
    (1, 2, 0, 0, '2025-12-20 20:00:00', 'scheduled', 'Stade de France'),
    (3, 4, 2, 1, '2025-12-15 18:00:00', 'finished', 'Allianz Arena');
