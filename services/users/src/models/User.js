const db = require('../db');

class User {
    static async findAll() {
        const [users] = await db.query(
            'SELECT id, email, role, created_at, updated_at FROM users'
        );
        return users;
    }

    static async findById(id) {
        const [users] = await db.query(
            'SELECT id, email, role, created_at, updated_at FROM users WHERE id = ?',
            [id]
        );
        return users[0];
    }

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
        return this.findById(result.insertId);
    }

    static async update(id, updates) {
        const fields = [];
        const values = [];

        Object.keys(updates).forEach(key => {
            fields.push(`${key} = ?`);
            values.push(updates[key]);
        });

        values.push(id);
        await db.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return this.findById(id);
    }

    static async delete(id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        return true;
    }
}

module.exports = User;
