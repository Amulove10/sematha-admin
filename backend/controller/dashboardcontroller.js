const db = require('../config/db.js');

const dashboardData = (erq, res) => {
    const tabels = ['blog', 'project']
    const results = {} 
    let completed = 0;

    tabels.forEach(tabel => {
        db.query(`SELECT COUNT(*) AS count FROM ${tabel}`, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            results[tabel] = rows[0].count;
            completed++;
            if (completed === tabels.length) {
                return res.status(200).json(results)
            }
        })
        
    })
}  

module.exports = {dashboardData}