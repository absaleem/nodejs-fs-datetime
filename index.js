const fs=require('fs');
const express = require("express");
const routers = require("./router/router");
const dotenv=require("dotenv");

dotenv.config();
const PORT= process.env.PORT || 3000;

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

app.listen(PORT,()=>{
console.log('connected');
});
