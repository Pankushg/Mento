const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const data = require('../data');
const User = require('../models/user');

let router = express.Router();

router.get('/',(req, res)=>{
    console.log('server fetching users list');
    console.log(req.query);

    let loggedInUser = {
        id:req.query.id,
        username: req.query.username
    }

    User.getUsersByUserId(loggedInUser,(err, users)=>{
        console.log(users);
        if(err) throw err;
        else if(users == null){
            console.log("No Users Found");
            res.send(
                JSON.stringify({
                    success:false,
                    msg:"No Users Found"
                })
            );
        } else{
            res.send(
                JSON.stringify({
                    success:true,
                    users:users
                })
            );
        }
    });
});

router.get('/authRoute',passport.authenticate('jwt', {session: false}),(req, res, next)=>{
    console.log('authRoute')
    res.json({user: req.user});
});
module.exports = router;