import express from 'express';
import product_Router from './route/product.routes.js';
import customer_Router from './route/customer.routes.js';
import comment_Router from './route/comment.routes.js';
import cart_Router from './route/cart.routes.js';
import check_Router from './route/check.routes.js';
import admin_Router from './route/admin.routes.js';

const router = express.Router();

router.use("/api/v1/check", check_Router);
router.use("/api/v1/admin", admin_Router);
router.use("/api/v1/product", product_Router);
router.use("/api/v1/customer", customer_Router);
router.use("/api/v1/comment", comment_Router);
router.use("/api/v1/cart", cart_Router);

export default router;