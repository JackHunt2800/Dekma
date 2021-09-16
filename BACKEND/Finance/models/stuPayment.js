const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const paymentSchema=new Schema({

    ClassId: {
        type: String,
        required:true
    },
    StudentId: {
        type: String,
        required: true
    },
    SubjectName: {
        type: String,
        required: true
    },
    PaymentDate: {
        type: Date,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    }


})

const stuPayment=mongoose.model("studentPayment", paymentSchema);

module.exports=stuPayment;





