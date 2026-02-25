import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const messages = await Contact.find()
      .sort({ createdAt: -1 }); // newest first
    res.status(200).json(messages);
  } catch (error) {
    console.error("CONTACT FETCH ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const markAsReplied = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndUpdate(
      id,
      { status: "replied" },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
