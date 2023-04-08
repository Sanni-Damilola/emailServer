import { Router } from "express";
import {
    changeUserPassword,
  createUser,
  deleteAllModel,
  getAllUser,
  getOne,
  resetPassword,
  verifiyUser,
} from "../controller/controller";

const router = Router();

router.route("/create").post(createUser);
router.route("/getone/:id").get(getOne);
router.route("/getall").get(getAllUser);
router.route("/verifiyuser/:id").post(verifiyUser);
router.route("/resetpassword").post(resetPassword);
router.route("/deleteallmodel").delete(deleteAllModel);
router.route("/changepassword/:id/:token").patch(changeUserPassword);

export default router;
