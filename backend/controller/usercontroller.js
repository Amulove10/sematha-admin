const db = require('../config/db');
const bcrypt = require('bcrypt');

// Register user
const register = async (req, res) => {
    const username = req.body; 
    const password = req.body;

    try {
        const hashpassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO login(username, password) VALUES(?, ?)';
        const values = [username, hashpassword];

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error inserting user' });
            }
            return res.status(200).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const login = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM login WHERE username = ?';
    db.query(sql, [username], async (err, result) => {
        if (err) return res.status(500).json({ message: 'DB error' });
        if (result.length === 0) return res.status(401).json({ message: 'User not found' });

        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        return res.status(200).json({ message: 'Login successful' });
    });
};

module.exports = { register, login };
