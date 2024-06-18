import express from 'express'
import {updateUser, deleteUser, getUserListings} from '../controllers/user.controller.js';
import verifyUser from '../utils/verifyUser.js';
import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id',verifyUser, updateUser);
router.delete('/delete/:id',verifyUser, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
export default router;