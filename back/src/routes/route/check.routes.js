import express from 'express';
import { getOne, wakeup } from '../../controller/customer.controller.js';
import checkToken from '../../middlewares/checkToken.js';

const router = express.Router();

router.get("/", wakeup);
router.get("/auth", checkToken, getOne);


export default router;