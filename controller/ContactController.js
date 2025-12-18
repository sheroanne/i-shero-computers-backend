import Contact from "../models/Contact.js";
import { isAdmin } from "./UserController.js";

export async function createContact(req, res) {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            res.status(400).json({
                message: "Name, email, subject, and message are required",
            });
            return;
        }

        const contact = new Contact({
            name,
            email,
            phone: phone || "",
            subject,
            message,
        });

        await contact.save();

        res.json({
            message: "Contact form submitted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error submitting contact form",
            error: error.message,
        });
    }
}

export async function getAllContacts(req, res) {
    if (!isAdmin(req)) {
        res.status(401).json({
            message: "Unauthorized",
        });
        return;
    }

    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching contacts",
            error: error.message,
        });
    }
}

