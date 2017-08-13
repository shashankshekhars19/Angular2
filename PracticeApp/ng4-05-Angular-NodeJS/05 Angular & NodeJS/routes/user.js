var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require('../models/user');

router.post('/' , function(req , res , next){
    var user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : bcrypt.hashSync(req.body.password),
        email : req.body.email

    });
    user.save(function( err ,results){
        if(err){
            return res.status(500).json({
                title : 'An error occured',
                error : err
            })
        }
        res.status(200).json({
            message : 'User Created',
            obj : results
        });
    });
});


router.post('/signin' , function(req , res , next){
    //console.log(req.body.email);
    User.findOne({email : req.body.email} ,function (err , user){
        if(err){
            return res.status(500).json({
                title : 'An error occured',
                error : err
            });
        }
        if(!user){
            return res.status(401).json({
                title : 'No User Found',
                error : { message : 'Invalid Login Credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password , user.password)){
            return res.status(401).json({
                title : 'No User Found',
                error : { message : 'Invalid Login Credentials'}
            });
        }
        var token = jwt.sign({ user : user} , "secret" , {expiresIn : 7200});
        res.status(200).json({
            message : 'Successfully Login ',
            token : token ,
            userId : user._id
        });
    })
});

module.exports = router;