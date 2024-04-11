var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */
router.post('/submit_category',upload.single('image'),function(req,res,next) {
    try{
    pool.query('insert into category (categoryname,image) value(?,?)',[req.body.categoryname,req.file.filename],function(error,result){
        if(error)
        {
         res.status(200).json({status:false,message:'Database error,please connect the database admin'})
        }
        else
        {
            res.status(200).json({status:true,message:'category submitted successfully'})
        }
    })
}
catch(e)
{
    res.status(200).json({status:false,message:'server error'})
}

});

router.get('/display_all_category',function(req,res,next){
  
    try{
        pool.query('select * from category',function(error,result){
            if(error)
            {
             res.status(200).json({status:false,message:'Database error,please connect the database admin'})
            }
            else
            {
            res.status(200).json({data:result,status:true,message:'success'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'server error'})
    }
    
    });



router.post('/Edit_category_data',function(req,res,next) {
        try{
        pool.query('update category set categoryname=? where categoryid=?',[req.body.categoryname,req.body.categoryid],function(error,result){
            if(error)
            {
             res.status(200).json({status:false,message:'Database error,please connect the database admin'})
            }
            else
            {
                res.status(200).json({status:true,message:'category update successfully'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'server error'})
    }
    
    });
    

router.post('/Edit_category_picture',upload.single('image'),function(req,res,next) {
        try{
        pool.query('update category set image=? where categoryid=?',[req.file.filename,req.body.categoryid],function(error,result){
            if(error)
            {
             res.status(200).json({status:false,message:'Database error,please connect the database admin'})
            }
            else
            {
                res.status(200).json({status:true,message:'image update successfully'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'server error'})
        }
    
    });

    router.post('/delete_category',function(req,res,next) {
        try{
        pool.query('delete from category where categoryid=?',[req.body.categoryid],function(error,result){
            if(error)
            {
             res.status(200).json({status:false,message:'Database error,please connect the database admin'})
            }
            else
            {
                res.status(200).json({status:true,message:'category delete successfully'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'server error'})
    }
    
    });
    
    
module.exports = router;
    