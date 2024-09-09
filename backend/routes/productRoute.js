const express = require("express");
const { getAllProduct, createProduct, udpateProduct,deleteProduct, getProductDetails, createProductReview, getProductReviews, deletePoductReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, roleAutherized } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get( getAllProduct);
router.route("/admin/product/new").post(isAuthenticatedUser, roleAutherized("admin"),createProduct);
router.route("/admin/products").get(isAuthenticatedUser,roleAutherized("admin"), getAdminProducts);
router.route("/admin/product/:id").put(isAuthenticatedUser,roleAutherized("admin"), udpateProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser,roleAutherized("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/product/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews),
router.route("/reviews").delete(isAuthenticatedUser, deletePoductReview)

module.exports = router

// roleAutherized