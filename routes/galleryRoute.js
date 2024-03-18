import express from "express";
const router = express.Router();
import {
  galleryController,
  galleryAddController,
  galleryDeleteController,
} from "../controller/galleryController.js";
import { isAuthenticated } from "../middleware/auth.js";
import singleUpload from "../middleware/multer.js";
router.get("/gallery", isAuthenticated, galleryController);
router.post("/galleryadd", isAuthenticated, singleUpload, galleryAddController);
router.delete("/gallerydelete/:id", isAuthenticated, galleryDeleteController);

export default router;
``;
