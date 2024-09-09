const catchAsyncErrors = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async(req, res, next)=>{
   try {
    
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"ShoppingHub"
        },
    });

 
    res.status(200).json({
        success:true,
        client_secret: myPayment.client_secret
    })
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});

exports.sendStripeApiKey = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY
    });
});