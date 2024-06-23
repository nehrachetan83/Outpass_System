import { Router } from "express";
import { registerUser,loggOutUser,loginUser } from "../controllers/user.contollers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields(
    [
        { name: "avatar", maxCount: 1 }
    ]
  ),
  registerUser
);
router.route("/login").post(
  loginUser,
);
router.route("/logout").post(
  verifyJWT,
  loggOutUser,
);

export default router;
