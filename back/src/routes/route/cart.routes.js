import express from 'express';
import checkToken from '../../middlewares/checkToken.js';
import { checkOut, setOrder, setOrderDetails } from '../../controller/cart.controller.js';

const router = express.Router();


router.post("/finalise_cart_detail", checkToken, setOrderDetails);
router.post("/finalise_order/:id", checkToken, setOrder);
router.post("/checkout", checkOut);


export default router;