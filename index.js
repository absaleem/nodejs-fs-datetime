const fs=require('fs');
const express = require("express");
const routers = require("./router/router");
const dotenv=require("dotenv");

dotenv.config();

const app=express();
app.use(express.json());

app.use('/',(req,res,next)=>{
    var auth={ authorised:true };

    if(auth.authorised){
     next(); 
    }else{
     res.send([
        {
            'msg':'not authorised'
        }
     ]);
   }
}); 

app.use('/file',routers); 

app.listen(process.env.PORT);