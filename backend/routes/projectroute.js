const express = require('express');
const route = express.Router(); 
const multer = require('multer');
const { postproject ,displayproject} = require('../controller/projectController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
        
    }

})
const upload = multer({ storage: storage })

route.post('/add', upload.single('image'), postproject)
route.get('/display',displayproject)
module.exports = route