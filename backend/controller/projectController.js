const db = require('../config/db');

const postproject =  (req,res) => {
    const { name, description, url } = req.body;
    const image = req.file ? req.file.filename:null

    const sql = 'INSERT INTO project(name, description,url,image) VALUES(?,?,?,?)';
    const values = [name,description , url, image]
    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).json({ message:'error in inserting project'})
            console.log(err);
            
        }
        res.status(200).json({message:'project added successfuly'})
    })
}

const displayproject = (req, res) => {
    const sql = 'SELECT * FROM project'

    db.query(sql, (err, resu) => {
        if (err) {
            res.status(500).json({message : 'error to fetch project'})
        }
        res.status(200).json(resu)
    })
     
}

module.exports= {postproject, displayproject}