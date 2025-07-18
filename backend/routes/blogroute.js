const express = require('express');
const route = express.Router(); 
const multer = require('multer');
const { blogpost, displayblog } = require('../controller/blogconroller.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
       cb(null, Date.now() + '-' + file.originalname)
        
    }
})

const upload = multer({ storage: storage })

route.get('/blogdisplay', displayblog)
route.post('/blogpost', upload.single('image'), blogpost)


module.exports = route