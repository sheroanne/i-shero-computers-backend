import express from "express";
import { createContact, getAllContacts } from "../controller/ContactController.js";

const contactRouter = express.Router();

contactRouter.post("/", createContact);
contactRouter.get("/all", getAllContacts);

export default contactRouter;

