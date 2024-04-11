var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
/* GET home page. */
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



    router.post('/display_all_productdetail_status',function(req,res,next){
  
        try{
            pool.query('select P.*,(select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brand B where B.brandid=P.brandid) as brandname ,(select Pr.productname from products Pr where Pr.productid= P.productid) as productname,(select Pr.picture from products Pr where Pr.productid= P.productid) as productpicture from productdetail P where P.radio=?',[req.body.radio],function(error,result){
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
    
router.post('/display_all_product_for_menu',function(req,res,next){

    try{
        pool.query('select products.*,category.categoryname,brand.brandname from products,category,brand where products.categoryid=category.categoryid and products.brandid=brand.brandid and products.categoryid=?',[req.body.categoryid],function(error,result){
            if(error)
            {
             res.status(200).json({status:false,message:'Database error,please connect the database admin'})
            }
            else
            {
                console.log(result)
            res.status(200).json({data:result ,status:true,message:'success'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'server error'})
    }
    });


    
router.post('/display_all_productdetail_productid',function(req,res,next){
  
    try{
        pool.query('select productdetail.*,category.categoryname,brand.brandname,products.productname from productdetail,products,category,brand where productdetail.categoryid=category.categoryid and productdetail.brandid=brand.brandid and productdetail.productid=products.productid and products.productid=?',[req.body.productid],function(error,result){
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

    router.post('/display_productdetail_id',function(req,res,next){
  
        try{
            pool.query('select P.*,(select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brand B where B.brandid=P.brandid) as brandname ,(select Pr.productname from products Pr where Pr.productid= P.productid) as productname,(select Pr.picture from products Pr where Pr.productid= P.productid) as productpicture from productdetail P where P.productdetailid=?',[req.body.productdetailid],function(error,result){
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

        router.post('/order_submit',function(req,res,next){
            try{
                var q='insert into orders ( orderdate, productdetailid, qty, paymentstatus, deliverystatus, mobileno, emailid,username, address) values ?'
                pool.query(q,[req.body.cart.map((item)=>{
                    return[new Date(),item.productdetailid,item.qty,req.body.paymentstatus,'Undelivered',req.body.user.mobileno,req.body.user.emailid,req.body.user.username,req.body.user.address]
                })],function(error,result){
                    if(error)
                    {
                     res.json({status:false,message:'Database error,please connect the database admin'})
                    }
                    else
                    {
                        console.log(result)
                    res.json({status:true,message:'order submitted successfully'})
                    }
                })
            }
            catch(e)
            {
                res.status(200).json({status:false,message:'server error'})
            }
            
            });
        

            router.post('/product_filter',function(req,res,next){
  
                try{
                    var q=`select P.productname,P.picture as mainpicture,PD.*,B.* from productdetail PD, products P,brand B where B.brandid=P.brandid and B.brandid=PD.brandid and B.categoryid=P.categoryid and B.categoryid=PD.categoryid and PD.productid=P.productid and (PD.modelno like '%${req.body.text}%' or P.productname like  '%${req.body.text}%' or B.brandname like  '%${req.body.text}%') `
                    pool.query(q,function(error,result){
                        if(error)
                        {
                         res.status(200).json({status:false,message:'Database error'})
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
        
    
    module.exports=router