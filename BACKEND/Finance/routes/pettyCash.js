const router=require("express").Router();
let pettyCash=require("../models/pettyCash");

//insert
router.route("/add").post((req,res)=>{

    const Date=req.body.Date;
    const itemName=req.body.itemName;
    const Category=req.body.Category;
    const Amount=Number(req.body.Amount);

    const newPettycash=new pettyCash({
        Date,
        itemName,
        Category,
        Amount
    })

    newPettycash.save().then(()=>{
        res.json("Entry added")
    }).catch((err)=>{
        console.log(err)
    })

})

//update
router.route("/update/:id").put(async (req,res)=>{

    let paymentId=req.params.id;

    //assigning values
    const{Date,itemName,Category,Amount}=req.body;

    const updatePCashDetails={
        Date,
        itemName,
        Category,
        Amount
    }

    const update=await pettyCash.findByIdAndUpdate(paymentId,updatePCashDetails)
    .then(()=>{
        res.status(200).send({status:"Details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error updating details", error:err.message})
    })

})

//retrieve data bulk
router.route("/").get((req,res)=>{

    pettyCash.find().then((pCash)=>{
        res.json(pCash);
    }).catch((err)=>{
        console.log(err);
    })

})

//retrieve on specific category
router.route("/get/:Category").get(async (req,res)=>{

    //let category=req.params.Category;

    const pCash=await pettyCash.findOne({"Category": req.params.Category})
    .then((pettyCash)=>{
        res.status(200).send({status: "Payment details fetched", pettyCash})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error retrieving", error:err.message});

    })

})

//retrieve of a specific row
router.route("/:id").get((req, res) => {
    pettyCash.findById(req.params.id)
    .then( FeeDetails=> res.json(FeeDetails))
    .catch(err => res.status(400).json('Error: ' + err)); 
  })



module.exports=router;