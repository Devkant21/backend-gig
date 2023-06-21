import express from "express";
import NCController from "./nc.controller"
const router = express.Router() //get access to express router
router.route("/").get(NCController.apiGetNC)

export default router