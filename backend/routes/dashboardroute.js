const express = require('express');
const route = express.Router();
const { dashboardData } = require('../controller/dashboardcontroller.js');

route.get('/all', dashboardData);
 
module.exports = route;
