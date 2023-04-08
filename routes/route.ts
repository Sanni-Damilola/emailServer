import { Router } from "express";
import {
  createUser,
  getAllUser,
  getOne,
  verifiyUser,
} from "../controller/controller";

const router = Router();

router.route("/create").post(createUser);
router.route("/getone/:id").get(getOne);
router.route("/getall").get(getAllUser);
router.route("/verifiyuser/:id").patch(verifiyUser);

export default router;
