import { Router } from "express"
import { getProduct1, produt1Create } from "../controllers/Product1.js";



const productRouter = Router();

productRouter.post('/product1', produt1Create);
productRouter.get('/product1', getProduct1);

export default productRouter