const Order = require("../models/orderModel");
const ErrorHandler = require ("../utils/errorhandler");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { findById } = require("../models/userModel");



// Creating a order
exports.newOrder = catchAsyncErrors(async(req, res, next)=>{
  try {
    const {shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        OrderStatus} = req.body;
    
       const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,      
        OrderStatus,
        paidAt:Date.now(),
        user:req.user._id,
            });
        res.status(200).json({
            success:true,
            message:"Order created successfully",
            order
            
        });
       
        
  } catch (error) {
    console.error("error eeeeee",error)
  }
});


// Get Single Order

exports.getSingleOrder = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        res.status(400).json({
            success:false,
            message:"Order not found with this id",
        });
    };
        res.status(200).json({
            success:true,
            order,
        });
});     


// get logged in orders -- users
exports.myOrders = catchAsyncErrors(async(req, res, next)=>{
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success:true,
        orders,
    });
});

// Get all orders -- admin

exports.getAllOrders = catchAsyncErrors(async(req, res, next)=>{
    const adminOrders = await Order.find()


    let totalAmount = 0;

    adminOrders.forEach((order)=>{
    totalAmount += order.totalPrice})


    res.status(200).json({
        success:true,
        adminOrders
    })

})


// Update Order Status --- admin

exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        res.status(400).json({
            success:false,
            message:"Order not found with this id"
        });
    };

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("Order has been already delivered",400))
    };

    
    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async(o)=>{
            await updateStock(o.product, o.quantity);
        });
    }
    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    };

    await order.save({validateBeforeSave:false});

    return res.status(200).json({
        success:true,
        message:"Order has been updated Successfully",
    });
});

async function updateStock (id, quantity) {
        const products = await Product.findById(id);

        products.Stock -= quantity;

        await products.save({validateBeforeSave:false});
};


// Delete Order --- admin

exports.deleteOrder = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findByIdAndDelete(req.params.id)

    if(!order){
        res.status(400).json({
            success:false,
            message:"Order not found"
        });
    };

    res.status(200).json({
        success:true,
        message:"Order Deleted SuccessFully"
    })
})