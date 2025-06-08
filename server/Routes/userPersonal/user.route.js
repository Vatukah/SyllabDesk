import { Router } from "express";
import protect from "../middleware/protect.js";
import { updateUniversity } from "../../controllers/user.control.js";

const user = Router();

user.post('/update_university',protect,updateUniversity);

export default user;