const mongoose= require("mongoose");
const formSchema = new mongoose.Schema({
    namef:{
        type:String,
        
    },
    datedebut:{
        type:String,
        
    },
    datefin:{
        type:String,
        
        
    },

    professeurname:{
        type:String,
        
    },
    image:{
        type:String,
       
        
    }
});

const form=new mongoose.model("formations",formSchema);
module.exports=form;