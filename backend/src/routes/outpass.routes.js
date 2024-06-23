import { Router } from "express";
import { createOutpass,getallRequest,getpendingHistory_of_SpecificUser } from "../controllers/outpass.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/outpass_create").post(
    verifyJWT,
    createOutpass
    );

router.route("/outpass_getall").get(
    verifyJWT,
    getallRequest
);


router.route("/outpass_specific").get(
    verifyJWT,
    getpendingHistory_of_SpecificUser
);



export default router;
