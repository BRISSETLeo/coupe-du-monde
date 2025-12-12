const db = require('../db');

class User {
    static async findByEmail(email) {
        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return users[0];
    }

    static async create(email, hashedPassword, role = 'Guest') {
        const [result] = await db.query(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            [email, hashedPassword, role]
        );

        const [users] = await db.query(
            'SELECT id, email, role, created_at FROM users WHERE id = ?',
            [result.insertId]
        );

        return users[0];
    }
}

module.exports = User;
