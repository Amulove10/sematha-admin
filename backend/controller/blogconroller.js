const db = require('../config/db.js');

const blogpost = (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO blog(title, content, image) VALUES (?, ?, ?)';
  const values = [title, content, image];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).json({ message: 'Error in posting blog' });
    }
    return res.status(200).json({ message: 'Blog posted successfully' });
  });
};

const displayblog = (req, res) => {
  const sql = 'SELECT * FROM blog';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB fetch error:', err);
      return res.status(500).json({ message: 'Error fetching blogs' });
    }
    return res.status(200).json(results);
  });
};

module.exports = { blogpost, displayblog };
