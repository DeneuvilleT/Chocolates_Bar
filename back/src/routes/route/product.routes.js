import express from 'express';
import { getOrigin, getResult, getOne, getResultAdvanced } from '../../controller/product.controller.js';


const router = express.Router();

router.get("/category", getOrigin);

router.post("/search/advanced", getResultAdvanced);
router.post("/search", getResult);
router.post("/search/:id", getOne);

export default router;