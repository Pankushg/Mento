const express = require('express')

const data = require('../data')

let router = express.Router();

router.get('/',(req, res)=>{
    console.log('server fetching user chats');
    result = data.getChats();
    res.send(JSON.stringify(result))
});

module.exports = router;