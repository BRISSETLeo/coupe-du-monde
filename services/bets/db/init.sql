CREATE DATABASE IF NOT EXISTS bets_db;
USE bets_db;

CREATE TABLE IF NOT EXISTS bets (
                                      id INT AUTO_INCREMENT PRIMARY KEY,
                                      user_id INT NOT NULL,
                                      match_id INT NOT NULL,
                                      cote FLOAT NOT NULL,
                                      bet_ammount FLOAT NOT NULL,
                                      status ENUM('in_progress', 'lost', 'won', 'cancelled') DEFAULT 'in_progress',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    );


-- Insert sample matches
INSERT INTO bets (user_id, match_id, cote, bet_ammount, status) VALUES
                                                                                         (1, 1, 2, 52, 'cancelled'),
                                                                                         (1, 3, 2, 126, 'won');