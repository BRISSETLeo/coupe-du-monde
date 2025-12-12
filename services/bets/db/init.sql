CREATE DATABASE IF NOT EXISTS bets_db;
USE bets_db;

CREATE TABLE IF NOT EXISTS bets (
                                      id INT AUTO_INCREMENT PRIMARY KEY,
                                      user_id INT NOT NULL,
                                      match_id INT NOT NULL,
                                      team_id INT NOT NULL,
                                      bet_type ENUM('victory', 'defeat', 'draw') DEFAULT 'victory',
                                      cote FLOAT NOT NULL,
                                      bet_ammount FLOAT NOT NULL CHECK (bet_ammount >= 1 AND bet_ammount <= 1000),
                                      status ENUM('in_progress', 'lost', 'won', 'cancelled') DEFAULT 'in_progress',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    );


-- Insert sample bets
INSERT INTO bets (user_id, match_id, team_id, bet_type, cote, bet_ammount, status) VALUES
                                                                                         (1, 1, 2, 'draw', 2, 52, 'cancelled'),
                                                                                         (1, 3, 2, 'victory', 8, 126, 'won');