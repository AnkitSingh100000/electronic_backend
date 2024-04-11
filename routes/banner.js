var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
/* GET home page. */

router.post('/submit_banner',upload.any(),function(req, res, next) {
    try
    {     
        var filenames=req.files.map((file,index)=>file.filename)
    pool.query('insert into banner (picture) values (?)',
    [filenames+''],function(error,result){       
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database error,please connect the database admin'})
        }
        else
        {
            res.status(200).json({status:true,message:'banner submitted successfullty'})
        }
})
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'server error'})
    }
    })

    router.get('/fetch_all_banner',upload.any(),function(req, res, next) {
        try
        {     
        pool.query('select * from banner',function(error,result){       
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false,message:'Database error,please connect the database admin'})
            }
            else
            {
                res.status(200).json({data:result,status:true,message:'banner submitted successfullty'})
            }
    })
        }
        catch(e)
        {
            res.status(200).json({status:false,message:'server error'})
        }
        })
    
    module.exports=router