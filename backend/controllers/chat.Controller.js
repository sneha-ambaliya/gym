import OpenAI from "openai";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY missing");
    }

    const user = await User.findById(userId).select(
      "name height weight goal workoutStreak membershipExpiry"
    );

    const products = await Product.find({ isActive: true }).select(
      "name price category description"
     );


    console.log("User Data:", user);

     if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create OpenAI AFTER env is loaded
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const productList = products
  .map(
    (p) =>
      `- ${p.name} | Category: ${p.category} | Price: ₹${p.price} | ${p.description || "No description"}`
  )
  .join("\n");

    const systemPrompt = `
You are an AI gym coach for a fitness website.

User profile:
Name: ${user.name}
Height: ${user.height} cm
Weight: ${user.weight} kg
Goal: ${user.goal} (${user.goal === "bulk" ? "muscle gain" : user.goal})
Workout streak: ${user.workoutStreak} days
Membership valid till: ${user.membershipExpiry?.toDateString()}

Available gym store products:
${productList}

Rules:
- Personalize advice strictly based on user's goal
- If goal is "bulk", focus on protein & strength
- If goal is "cut", focus on calorie deficit & cardio
- If goal is "maintain", focus on balance
- Motivate user if streak is high
- Be supportive, not medical
- Keep replies concise & friendly
- as well as you are the best seller of supplements and protein powders in the gym website suggest the product according to the user's goal.
`;

const finalPrompt = `
${systemPrompt}

User message:
${message}
`;


    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: finalPrompt,
    });

    const aiReply = response.output_text || "No response";

    await Chat.create({
      userMessage: message,
      aiReply,
    });

    res.json({ reply: aiReply });

  } catch (error) {
    console.error(" OPENAI ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};
