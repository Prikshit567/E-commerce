const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, roleAutherized } = require("../middleware/auth");



router.route("/order/new").post( isAuthenticatedUser ,newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/allorders").get(isAuthenticatedUser, roleAutherized("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, roleAutherized("admin"), updateOrder);
router.route("/admin/order/:id").delete(isAuthenticatedUser, roleAutherized("admin"), deleteOrder);

module.exports = router;