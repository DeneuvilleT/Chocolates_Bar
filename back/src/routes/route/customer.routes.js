import express from 'express';
import checkToken from '../../middlewares/checkToken.js';
import { getOne, signIn, signUp, updateInfos, updateEmail, loadDatas, loadPicture, updatePicture, loadOrder } from '../../controller/customer.controller.js';

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);

router.get("/:id", checkToken, getOne);
router.get("/load/:id", checkToken, loadDatas);
router.get("/updateValidate/:email", updateEmail);

router.put("/update/picture/:id", checkToken, updatePicture);
router.patch("/update/:id", checkToken, updateInfos);
router.post("/order/:id", checkToken, loadOrder);
router.post("/picture", loadPicture);

export default router;