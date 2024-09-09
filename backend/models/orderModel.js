const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:[true, "Please enter your address to place order"],
        },
        city:{
            type:String,
            required:[true, "Please Enter city to continue"],
        },
        state:{
            type:String,
            required:[true, "Please enter your state to place order"],
        },
        country:{
            type:String,
            required:[true, "Please enter countryto place order"],
        },
        pinCode:{
            type:Number,
            required:[true, "Please enter pincode to place order"],
        },
        phoneNumber:{
            type:String,
            required:[true, "Please provide your Phone number to place order"],
        },
    },
    orderItems:[
       {
         name:{
            type:String,
            required:[true,"Please Enter name of the product"]
        },
        price:{
            type:Number,
            required:[true,"Please Provide price of the order"]
        },
        quantity:{
            type:Number,
            required:[true,"Please provide the quantity."]
        },
        image:{
            type:String,
            required:true,
        },
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product",
            required:true,
        },
    },
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    paymentInfo:{
        id:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true,
        },
    },
    paidAt:{
        type:Date,
        required:true,
        default:0,
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0,
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0,
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0,
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Processing"
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now,
    },
    });

    module.exports = mongoose.model("Order", orderSchema);