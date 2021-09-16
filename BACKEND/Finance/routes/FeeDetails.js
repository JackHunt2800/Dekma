const router=require("express").Router();
let feeDet=require("../models/TuitionFeeDetails");

//http://localhost:8090/feeDetails/add this is the use of route method
router.route("/add").post((req,res)=>{

    const TeacherId=req.body.TeacherId;
    const name=req.body.name;
    const subjectId=req.body.subjectId;
    const subjectName=req.body.subjectName;
    const Amount=Number(req.body.Amount);

    const newFeeDetails=new feeDet({
        TeacherId,
        name,
        subjectId,
        subjectName,
        Amount
    })

    //cheching if added or not
    newFeeDetails.save().then(()=>{
        res.json("Student addedd")
    }).catch((err)=>{
        console.log(err);
    })

})

//data retrieving
router.route("/").get((req,res)=>{
    //using .find() method we get all the results in the table
    feeDet.find().then((feeDetail)=>{
        res.json(feeDetail)
    }).catch((err)=>{
        console.log(err);
    })

})

//update data
router.route("/update/:id").put(async (req,res)=>{
    //assigning the mongodb assigned id
    let userId=req.params.id;

    //assigning values
    //destructure method used
    const{TeacherId,name,subjectId,subjectName,Amount}=req.body;

    const updateFeeDetails={
        TeacherId,
        name,
        subjectId,
        subjectName,
        Amount
    }
    //also we can use (userId,{TeacherId,name,subjectId,subjectName,Amount})
    const update=await feeDet.findByIdAndUpdate(userId,updateFeeDetails)
    .then(()=>{
        //res.status() means like error code given 404
        res.status(200).send({status:"Details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error updating data", error:err.message});
    })
    
})

//delete
router.route("/delete/:id").delete(async (req,res)=>{

    let userId=req.params.id;

    await feeDet.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"user deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with deleting", error:err.message});
    })

})

//retrieve data by id

router.route("/get/:id").get(async (req,res)=>{

    let userId=req.params.id;

    const user=await feeDet.findById(userId)
    .then((FeeDetails)=>{
        res.status(200).send({status:"User fetched", FeeDetails})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with get user", error:err.message});
    })
    
})







module.exports=router;





