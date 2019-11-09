const express = require('express');

const data = require('../data')

const router = express.Router();

router.post('/',(req, res)=>{
    console.log(`${req.body.userName} register request processing...`);
    status = data.register(req.body.userName);
    if(status==true){
        res.send(JSON.stringify({
            success : true,
            userName :  req.body.userName
        }));
    }
});

module.exports = router
