const express = require('express');
const mongoose = require('mongoose');

const data = require('../data');
const User = require('../models/user');

let router = express.Router();

router.get('/',(req, res)=>{
    console.log('server fetching users list');
    console.log(req);

    let loggedInUser = {
        id:req.query.id,
        username: req.query.username
    }

    User.getUsersByUserId(loggedInUser,(err, users)=>{
        if(err) throw err;
        else if(users.users == null){
            console.log("No Userd Found");
            res.send(
                JSON.stringify({
                    success:false,
                    msg:"No Users Found"
                })
            );
        } else{
            console.log(users);
            res.send(
                JSON.stringify({
                    success:true,
                    users:users
                })
            );
        }
    });
});
module.exports = router;