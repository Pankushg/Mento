const express = require('express');
const mongoose = require('mongoose');

const data = require('../data');
const User = require('../models/user');

const router = express.Router();

router.post('/',(req, res)=>{

    console.log(`${req.body.userName} register request processing...`);

    let newUser = new User({
        username:req.body.userName
    });

    User.getUserByUsername(newUser,(err, user)=>{
        if(err) throw err;
        else if(user != null){
            console.log(newUser.username + " already registered");
            res.send(
                JSON.stringify({
                    success:false,
                    msg:"Username already present"
                })
            );
        }
        else {
            console.log(newUser.username + " added");
            User.addUser(newUser,(err,user)=>{
                if(err) res.json({
                    success:false ,
                    msg: 'Failed to register user'
                });
                else res.json({
                    success:true ,
                    user : user,
                    msg: 'User registered successfully!!'
                });
            });
        }
    });
    /* result = data.register(req.body.userName);
    if(result.success){
        res.send(JSON.stringify({
            success : result.success,
            index : result.index,
            userName :  req.body.userName,
        }));
    } else{
        res.send(JSON.stringify({
            success : false,
            userName :  req.body.userName,
            msg : result.msg,
        }));
    } */
});

module.exports = router
