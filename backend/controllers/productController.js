const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeature")
const mongoose = require("mongoose");
const cloudinary = require("cloudinary")


// To Avoid write try and catch syntax we just made catchAsyncError function and wrap the functions inside that. 
// And to avoid writing conditions inside the if statement again and again we hust made a errorhandler class and return the response. we can also use this approach its same.

// Creating a new Product (Admin) 

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    // console.log('----->',req.body )

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    console.log(imagesLinks)
    const data = {
        ...req.body, images: imagesLinks, user: req.user.id
    }
    console.log('data ====>', data, req.user,)

    const product = await Product.create(data);
    console.log("product", product)
    res.status(201).json({
        success: true,
        message: "Product Added Successfully",
        product
    })
});



// Getting Product Details

exports.getProductDetails = async (req, res, next) => {
    try {
         

        let product = await Product.findById(req.params.id);
        if (!product) {
           
            return next(new ErrorHandler("Product not found", 404));
        }
        else {

            res.status(201).json({
                success: true,
                message: "Product Details Fetched SuccessFully",
                product,
            })
        }
    } catch (error) {
        console.log("error while updating the product", error)
        next(error);
    }
};

// Getting All Products
// exports.getAllProduct = async (req, res, next) => {

//     try {
//         const resultPerPage = 8;
//     const productCount = await Product.countDocuments();
//     const apiFeature = new ApiFeatures(Product.find(), req.query)
//         .search()
//         .filter();
//         // .pagination(resultPerPage);
//         let products = await apiFeature.query;
//         console.log("Products", products)

//         let filteredProductsCount = products.length;
//         console.log("filteredProducts", filteredProductsCount)

//         apiFeature.pagination(resultPerPage);

//         products = await apiFeature.query;

//     res.status(201).json({
//         success: true,
//         //  allProduct
//         products,
//         productCount,
//         resultPerPage,
//         filteredProductsCount
//     })
//     } catch (error) {
//         console.error(error); 
//         res.status(500).json({
//             success: false,
//             message: error.message,
//           });
//     }
// }

exports.getAllProduct = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeature.query.clone();

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

//   All Products (ADMIN)

exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const adminProducts = await Product.find();

    res.status(200).json({
        success: true,
        adminProducts,
    });
});



// Updating The Product

exports.udpateProduct =  catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }
      
        if (images !== undefined) {
          // Deleting Images From Cloudinary
          for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
          }
      
          const imagesLinks = [];
      
          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: "products",
            });
      
            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
      
          req.body.images = imagesLinks;
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });
        
          res.status(200).json({
            success: true,
            product,
          });
        });


// Deleting a Product

exports.deleteProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            res.status(500).json({
                success: false,
                message: "Product Not Found",
            })
        }
        else {
            // Deleting Images From Cloudinary
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }

            product = await Product.findByIdAndDelete(req.params.id)

            res.status(201).json({
                success: true,
                message: "Product Deleted Successfully",
                product,
            })
        }

    } catch (error) {
        console.log("error while Delting the Product", error)
    }
}

// Create New Review or Update the review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );


    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    try {
        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error("Error saving product review:", error);
        res.status(500).json({
            success: false,
            message: 'Error saving product review'
        });
    }
});


// Get all reviews of the poduct

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        res.status(401).json({
            status: false,
            message: "Product not found"
        });
    };
    res.status(200).json({
        status: true,
        reviews: product.reviews
    })
})


// Deleting a review of a product 


exports.deletePoductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        res.status(401).json({
            status: false,
            message: "Product not found",
        });
    };

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    
    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0
    if (reviews.length === 0) {
        ratings = 0
    }
    else {
        ratings = avg / reviews.length;
    }
    const numOfReviews = reviews.length


    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    res.status(200).json({
        success: true,
    })
})
