import express from 'express';
import { getAllComments, getAllCustomers, getAllProducts, getAllOrders, updateStatus, updateOrder, deleteComment, deleteProduct, addProduct } from '../../controller/admin.controller.js';
import checkToken from '../../middlewares/checkToken.js';


const router = express.Router();


router.get("/get_all_customers", checkToken, getAllCustomers);
router.get("/get_all_comments", checkToken, getAllComments);
router.get("/get_all_products", checkToken, getAllProducts);
router.get("/get_all_orders", checkToken, getAllOrders);

router.post("/delete_comment", checkToken, deleteComment);
router.post("/delete_product", checkToken, deleteProduct);
router.post("/add_product", checkToken, addProduct);

router.put("/update_customer", checkToken, updateStatus);
router.put("/update_order", checkToken, updateOrder);


export default router;