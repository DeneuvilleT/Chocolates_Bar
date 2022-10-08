import express from 'express';
import checkToken from '../../middlewares/checkToken.js';
import { postComment, editComment } from '../../controller/comment.controller.js';


const router = express.Router();

router.post("/post/:id", checkToken, postComment);
router.patch("/post/:id", checkToken, editComment);

export default router;