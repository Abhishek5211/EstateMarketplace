import { Router } from "express";
import verifyToken from "../utils/verifyUser.js";
import {createListing , deleteListing, updateListing} from '../controllers/listing.controller.js';

const router = Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/delete/:id", verifyToken, updateListing);

export default router;
