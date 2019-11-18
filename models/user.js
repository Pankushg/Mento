const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs')
const config = require('../config/db')

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    }}, {versionKey:false});

const User = module.exports = mongoose.model('User',UserSchema,'users')

module.exports.addUser=(newUser,callback)=>{
    newUser.save(callback);
    /* bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password=hash;
            newUser.save(callback)
        });
    }); */
}

module.exports.getUserByUsername=(newUser,callback)=>{
    const query = {username:newUser.username}
    User.findOne(query,callback)
}

module.exports.getUsersByUserId=(loggedInUser,callback)=>{
    console.log('searching users in db ' + loggedInUser.id)
    const query = {_id: { $ne: loggedInUser.id }};
    //User.findOne(query,callback)
    User.find(query,callback);
}

module.exports.getUserById=(id,callback)=>{
    User.findById(id,callback);
}

module.exports.getUserByEmail=(email,callback)=>{
    const query = {email:email}
    User.findOne(query,callback)
}

/* module.exports.getUserByContact=(contact,callback)=>{
    const query = {contact:contact}
    User.findOne(query,callback)
}*/

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null, isMatch)
    });
}