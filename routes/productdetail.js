var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
/* GET home page. */
router.post('/submit_productdetail',upload.any(),function(req, res, next) {
    try
    {
        var filenames=req.files.map((file,index)=>file.filename)
    pool.query('insert into productdetail (categoryid,brandid,productid,modelno,discription,color,price,offerprice,stock,hsn,radio,picture) values (?,?,?,?,?,?,?,?,?,?,?,?)',
    [req.body.categoryid,req.body.brandid,req.body.productid,req.body.modelno,req.body.discription,req.body.color,req.body.price,req.body.offerprice,req.body.stock,req.body.hsn,req.body.radio,filenames+''],function(error,result){       
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database error,please connect the database admin'})
        }
        else
        {
            res.status(200).json({status:true,message:'productdetail submitted successfullty'})
        }
})
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'server error'})
    }
    })



router.get('/display_all_productdetail',function(req,res,next){
  
    try{
        pool.query('select productdetail.*,category.categoryname,brand.brandname,products.productname from productdetail,products,category,brand where productdetail.categoryid=category.categoryid and productdetail.brandid=brand.brandid and productdetail.productid=products.productid',function(error,result){
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


    router.post('/edit_productdetail_data', function(req, res, next) {
        pool.query('update productdetail set categoryid=?,brandid=?,productid=?,modelno=?,discription=?,color=?,price=?,offerprice=?,stock=?,hsn=?,radio=? where productdetailid=?',[req.body.categoryid,req.body.brandid,req.body.productid,req.body.modelno,req.body.discription,req.body.color,req.body.price,req.body.offerprice,req.body.stock,req.body.hsn,req.body.radio,req.body.productdetailid],function(error,result){
           try{
            if(error)
                {
                    console.log(error)
                 res.status(200).json({status:false,message:'Database error,please connect the database admin'})
                }
                else
                {
                    res.status(200).json({status:true,message:'productdetail Edit successfully'})
                } 
            }
        
        catch(e)
        {
            res.status(200).json({status:false,message:'server error'})
        }
        })
        })

        router.post('/edit_productdetail_picture',upload.single('picture'), function(req, res, next) {
            pool.query('update productdetail set picture=? where productdetailid=?',[req.file.filename,req.body.productdetailid],function(error,result){
               try{
                if(error)
                    {
                        console.log(error)
                     res.status(200).json({status:false,message:'Database error,please connect the database admin'})
                    }
                    else
                    {
                        res.status(200).json({status:true,message:'productdetail image successfully'})
                    } 
                }
            
            catch(e)
            {
                res.status(200).json({status:false,message:'server error'})
            }
            })
            })

            router.post('/delete_productdetail',function(req, res, next) {
                pool.query('delete from productdetail where productdetailid=?',[req.body.productdetailid],function(error,result){
                   try{
                    if(error)
                        {
                         res.status(200).json({status:false,message:'Database error,please connect the database admin'})
                        }
                        else
                        {
                            res.status(200).json({status:true,message:'productdetail delete successfully'})
                        } 
                    }
                
                catch(e)
                {
                    res.status(200).json({status:false,message:'server error'})
                }
                })
                })

module.exports=router