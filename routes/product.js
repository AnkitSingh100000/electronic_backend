var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
/* GET home page. */
router.post('/submit_product',upload.single('picture'),function(req, res, next) {
    pool.query('insert into products (categoryid,brandid,productname,picture) value(?,?,?,?)',[req.body.categoryid,req.body.brandid,req.body.productname,req.file.filename],function(error,result){
       try
       {
        if(error)
        {
            res.status(200).json({status:false,message:'Database error,please connect the database admin'})
        }
        else
        {
            res.status(200).json({status:true,message:'products submitted successfullty'})
        }
    }
    catch(e){
        res.status(200).json({status:false,message:'server error'})
    }
    })
});

router.get('/display_all_product',function(req,res,next){

    try{
        pool.query('select products.*,category.categoryname,brand.brandname from products,category,brand where products.categoryid=category.categoryid and products.brandid=brand.brandid ',function(error,result){
            if(error)
            {
             res.status(200).json({status:false,message:'Database error,please connect the database admin'})
            }
            else
            {
                console.log(result)
            res.status(200).json({data:result,status:true,message:'success'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'server error'})
    }
    });

    router.post('/edit_product_data', function(req, res, next) {
        pool.query('update products set categoryid=?,brandid=?,productname=? where productid=?',[req.body.categoryid,req.body.brandid,req.body.productname,req.body.productid],function(error,result){
           try{
            if(error)
                {
                    console.log(error)
                 res.status(200).json({status:false,message:'Database error,please connect the database admin'})
                }
                else
                {
                    res.status(200).json({status:true,message:'product Edit successfully'})
                }
            }       
        catch(e)
        {
            res.status(200).json({status:false,message:'server error'})
        }
        })
        })

        router.post('/edit_product_picture',upload.single('picture'), function(req, res, next) {
            pool.query('update products set picture=? where productid=?',[req.file.filename,req.body.productid],function(error,result){
               try{
                if(error)
                    {
                        console.log(error)
                     res.status(200).json({status:false,message:'Database error,please connect the database admin'})
                    }
                    else
                    {
                        res.status(200).json({status:true,message:'product image successfully'})
                    } 
                }
            
            catch(e)
            {
                res.status(200).json({status:false,message:'server error'})
            }
            })
            })

            router.post('/delete_product',function(req, res, next) {
                pool.query('delete from products where productid=?',[req.body.productid],function(error,result){
                   try{
                    if(error)
                        {
                         res.status(200).json({status:false,message:'Database error,please connect the database admin'})
                        }
                        else
                        {
                            res.status(200).json({status:true,message:'product delete successfully'})
                        } 
                    }
                
                catch(e)
                {
                    res.status(200).json({status:false,message:'server error'})
                }
                })
                })
                
router.post('/display_all_product_by_brand',function(req,res,next){
  
    try{
        pool.query('select * from products where categoryid=? and brandid=?',[req.body.categoryid,req.body.brandid],function(error,result){
            if(error)
            {
                console.log(error)
             res.status(500).json({status:false,message:'Database error,please connect the database admin'})
            }
            else
            {
                console.log(result)
            res.status(200).json({data:result,status:true,message:'success'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'server error'})
    }
    
    });

module.exports = router;
