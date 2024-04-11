var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/submit_brand',upload.single('image'), function(req, res, next) {
pool.query('insert into brand (categoryid ,brandname,image) values(?,?,?)',[req.body.categoryid,req.body.brandname,req.file.filename],function(error,result){
   try{
    if(error)
        {
            console.log(error)
         res.status(200).json({status:false,message:'Database error,please connect the database admin'})
        }
        else
        {
            res.status(200).json({status:true,message:'brands submitted successfully'})
        } 
    }

catch(e)
{
    res.status(200).json({status:false,message:'server error'})
}
})
})

router.get('/display_all_brand',function(req,res,next){
  
    try{
        pool.query('select B.* ,(select C.categoryname from category C where C.categoryid = B.categoryid) as categoryname from brand B',function(error,result){
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


    router.post('/edit_brand_data', function(req, res, next) {
        pool.query('update brand set categoryid=?,brandname=? where brandid=?',[req.body.categoryid,req.body.brandname,req.body.brandid],function(error,result){
           try{
            if(error)
                {
                    console.log(error)
                 res.status(200).json({status:false,message:'Database error,please connect the database admin'})
                }
                else
                {
                    res.status(200).json({status:true,message:'brands Edit successfully'})
                } 
            }
        
        catch(e)
        {
            res.status(200).json({status:false,message:'server error'})
        }
        })
        })

        router.post('/edit_brand_picture',upload.single('image'), function(req, res, next) {
            pool.query('update brand set image=? where brandid=?',[req.file.filename,req.body.brandid],function(error,result){
               try{
                if(error)
                    {
                        console.log(error)
                     res.status(200).json({status:false,message:'Database error,please connect the database admin'})
                    }
                    else
                    {
                        res.status(200).json({status:true,message:'brands image successfully'})
                    } 
                }
            
            catch(e)
            {
                res.status(200).json({status:false,message:'server error'})
            }
            })
            })

            router.post('/delete_brand',function(req, res, next) {
                pool.query('delete from brand where brandid=?',[req.body.brandid],function(error,result){
                   try{
                    if(error)
                        {
                            console.log(error)
                         res.status(200).json({status:false,message:'Database error,please connect the database admin'})
                        }
                        else
                        {
                            res.status(200).json({status:true,message:'brands delete successfully'})
                        } 
                    }
                
                catch(e)
                {
                    res.status(200).json({status:false,message:'server error'})
                }
                })
                })


                
router.post('/display_all_brand_by_category',function(req,res,next){
  
    try{
        pool.query('select B.* ,(select C.categoryname from category C where C.categoryid = B.categoryid) as categoryname from brand B where categoryid=?',[req.body.categoryid],function(error,result){
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

module.exports = router;
