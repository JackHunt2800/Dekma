const router=require("express").Router();
let stuPayment=require("../models/stuPayment");

//add student payments to the db
router.route("/add").post((req,res)=>{

    const ClassId=req.body.ClassId;
    const StudentId=req.body.StudentId;
    const SubjectName=req.body.SubjectName;
    const PaymentDate=req.body.PaymentDate;
    const Amount=Number(req.body.Amount);

    const newStuPayment=new stuPayment({
        ClassId,
        StudentId,
        SubjectName,
        PaymentDate,
        Amount
    })

    //cheching of added or not
    newStuPayment.save().then(()=>{
        res.json("Student payment details added")
    }).catch((err)=>{
        console.log(err);
    })

})



















module.exports=router;