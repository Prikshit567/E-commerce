const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plese Enter Product Name"],
    },
    description: {
        type: String,
        required: [true, "PLease Enter Product Description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price cannot be more than 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url:{
                type:String,
                required:true,
            }
        },
    ],
    category:{
        type:String,
        required:[true, "Please enter category of the product"]
    },
    Stock:{
        type:Number,
        required:[true, "Please enter the number of stock of the product"],
        maxLength:[14, "The Stocks cannot be 4 character long"],
        default:1,
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true,
            },
            name:{
                type:String,
                required:[true, "Please Enter name"],
            },
            rating:{
                type:Number,
                required:[true],
            },
            comment:{
                type:String,
                required:[true],
            },
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }
})


module.exports = mongoose.model("Product", productSchema);