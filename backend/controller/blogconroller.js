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

const edit = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  let query = ''
  let values = []

  if (req.file){
    db.query('UPDATE blog SET title = ?, content = ?, image = ? WHERE id = ?', [title, content, req.file.filename, id], (err, result) => {
      if(err)return res.status(500).json({message: 'error updating data'})
    })
  } else {
    db.query('UPDATE blog SET title = ?, content = ? WHERE id=?', [title, content, id], (err, result) => {
      if(err) return res.status(500).json({message:'error updating info'})
    })
  }

  await db.execute(query, values)
  return res.status(200).json({message:'Blog updated successfully'})
}

module.exports = { blogpost, displayblog, edit };
