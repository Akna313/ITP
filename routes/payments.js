const router = require("express").Router();
let Payment = require("../models/Payment");


//create
router.route("/add").post((req,res)=>{

    const { amount, date, bank, branch, remark } = req.body;

    const [day, month, year] = date.split(" ");

    const newDate = new Date(`${day} ${month} ${year}`);

    const newPayment = new Payment({
        amount,
        date:newDate,
        bank,
        branch,
        remark
    })

    newPayment.save().then( ()=>{
        res.json("Payment saved Successfully")
    }).catch((err)=>{
        res.status(500).send({status:"Error with saving payment details",error:err.message});
    })//java script promise like if else exception handling
})

//Read
router.route("/").get((req,res)=>{
    Payment.find().then((payments)=>{
        
        res.json({
            success:true,
            existingPayments:payments})
    }).catch((err)=>{
        res.status(500).send({status:"Error with fetching payment details",error:err.message});
    })
})

//update
router.route("/update/:paymentId").put(async(req,res)=>{//:for primary key we can use any name like pid id , async=asynchronos function which used to have 2 updates at same time it happens at the same time without canceling any
    let paymentId = req.params.paymentId;//fetch id from url
    //destructure
    const{amount,date,bank,branch,remark} = req.body;

    const updatePayment = {
        amount,
        date,
        bank,
        branch,
        remark
    }
    const update = await Payment.findByIdAndUpdate(paymentId,updatePayment) //wait until promise happen
    .then(() =>{
        res.status(200).send({status:"Payment Details Updated"})//like 404 not found
    }).catch((err)=>{
        res.status(500).send({status:"Error with updating data",error:err.message});//500 iternal server error
    })

    
})
//delete
router.route("/delete/:paymentId").delete(async(req,res)=>{
    let paymentId = req.params.paymentId;
    await Payment.findByIdAndDelete(paymentId)
    .then(() =>{
        res.status(200).send({status: "Payment Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status : "Error with deletion", error:err.message});
    })
})


// Fetch a specific payment by ID
router.get("/:id", async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        return res.status(200).json({
            message: "Payment fetched successfully",
            payment: payment
        });
    } catch (err) {
        return res.status(400).json({
            message: "Error fetching payment",
            error: err
        });
    }
});

//display one payment details
// router.get("/get/:id",(req,res)=>{
//     let paymentId = req.params.id;
//     Payment.findBYId(paymentId,(err,payments) =>{
//         if(err){
//             return res.status(400).json({successs:false,err});
//         }
//         return res.status(200).json({
//             success:true,
//             payments

//         });
//     });
// })

router.route("/post/:id").get(async(req,res)=>{
    let id = req.params.id;
    const payment = await Payment.findById(id)
    .then((payment)=>{
        res.status(200).send({status: "payment fetched",payment,success:true})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get payment details",error:err.message,success:false});
    });

});

module.exports = router;