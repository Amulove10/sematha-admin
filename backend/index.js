const express = require('express');
const cors = require('cors');
const db = require('./config/db')
const proroute = require('./routes/projectroute')
const blogroute = require('./routes/blogroute')
const path = require('path');
const userroute = require('./routes/userroute')
const dashboardroute = require('./routes/dashboardroute')
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT || 1011;



db.connect((err) => { 
    if (err) {
        console.error('DB connection failed:', err.message);
    } else {
        console.log('✅ Connected to the MySQL database');
    }
});
app.use('/api/dashboard',dashboardroute)
app.use('/api/project', proroute)
app.use('/api/blog',blogroute)
app.use('/api/admin',userroute)
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`)
})