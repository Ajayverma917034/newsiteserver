import { addBanner, createBanner, delBanner, getBanner } from "../controllers/banner.js";
import { Router } from "express";

const dataRouter = Router();
dataRouter.post('/banner', createBanner);
dataRouter.get('/getbanner', getBanner);
dataRouter.post('/addbanner', addBanner);
dataRouter.post('/delbanner', delBanner);

export default dataRouter;