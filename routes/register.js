const express = require('express');

const data = require('../data')

const router = express.Router();

router.post('/',(req, res)=>{
    console.log(`${req.body.userName} register request processing...`);
    result = data.register(req.body.userName);
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
    }
});

module.exports = router
