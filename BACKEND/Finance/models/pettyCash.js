const mongoose=require('mongoose');

const Schema=mongoose.Schema;

//error ekak nam date eka maru karanna type eka

const pettyCashSchema=new Schema({

    Date: {
        type:Date,
        required:true
    },
    itemName: {
        type:String,
        required: true
    },
    Category: {
        type:String,
        required: true
    },
    Amount: {
        type:Number,
        required: true
    }

})

const pettyCash=mongoose.model("PettyCash", pettyCashSchema);

module.exports=pettyCash;