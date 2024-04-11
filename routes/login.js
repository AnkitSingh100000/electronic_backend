var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
/* GET home page. */
router.post('/submit_login',function(req, res, next) {
    try
    {
    pool.query('select * from admins where (email=? or mobileno=?) and password=?',
    [req.body.email,req.body.email,req.body.password],function(error,result){       
        if(error)
        {
            res.status(200).json({status:false,message:'Database error,please connect the database admin'})
        }
        else
        {
            if(result.length==1)
            {
            res.status(200).json({status:true,message:'Login successfullty',data:result[0]})
            }
            else
            {
            res.status(200).json({status:false,message:'Invailed email/password'})
            }
        }
})
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'server error'})
    }
    })

    module.exports=router