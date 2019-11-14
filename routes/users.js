const express = require('express')

const data = require('../data')

let router = express.Router();

router.get('/',(req, res)=>{
    console.log('server fetching users list');
    result = data.getUsers();
    res.send(JSON.stringify(result))
});

module.exports = router;