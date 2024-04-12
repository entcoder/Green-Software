import {Router} from 'express'
import { addBookInCart, getCartBooks } from '../controllers/cart.controller.js';

const router= Router();


router.route("/addToCart").post(addBookInCart);
router.route("/getCartBooks/:userId").get(getCartBooks);

export default router

