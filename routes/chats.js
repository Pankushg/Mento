const express = require('express');
const passport = require('passport');

const data = require('../data')

let router = express.Router();

router.get('/',(req, res)=>{
    console.log('server fetching user chats');
    result = data.getChats();
    res.send(JSON.stringify(result))
});

router.get('/authRoute',passport.authenticate('jwt', {session: false}),(req, res, next)=>{
    console.log('authRoute chat')
    res.json({user: req.user});
});

module.exports = router;