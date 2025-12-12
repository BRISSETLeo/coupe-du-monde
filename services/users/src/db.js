const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'userservice',
    password: process.env.DB_PASSWORD || 'userpassword',
    database: process.env.DB_NAME || 'users_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Créer la table users au démarrage
const initDatabase = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('Guest', 'Admin') DEFAULT 'Guest',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
        console.log('✅ Database initialized');
    } catch (error) {
        console.error('❌ Database initialization error:', error);
    }
};

initDatabase();

module.exports = pool;
