const express=require("express");
const router=express.Router();
const fs=require('fs');

router.get("/create",async(req,res,next)=>{
    try{
        let date_ob = new Date();
        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        // current hours
        let hours = date_ob.getHours();
        // current minutes
        let minutes = date_ob.getMinutes();
        // current seconds
        let seconds = date_ob.getSeconds();

        var file_name= date+"-"+month+"-"+year+"-"+hours+minutes+seconds;
        var ws = fs.createWriteStream(`files/${file_name}.txt`, { 
            'flags'   : 'w',
            'encoding': 'utf8',
            'mode'    : 0666,
        });

        const timestamp = date_ob.getTime();
        var data = "Current Timestamp is: "+timestamp;
        ws.write(data, function() {
        // Now the data has been written.
        });

     res.send("The file was created at "+file_name);
    }catch(error){ 
        res.status(500).send(error);
    }
});

router.get("/list",async(req,res,next)=>{
    try{
        const testFolder = './files/';
        let filenames=[]; 
        fs.readdirSync(testFolder).forEach(file => {
            filenames.push(file);
        });
     res.send(filenames);
    }catch(error){ 
        res.status(500).send(error);
    }
});

module.exports=  router;