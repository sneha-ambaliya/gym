import User from "../models/User.js";
import Plan from "../models/Plan.js";

/* GET PROFILE */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("activePlan"); // <-- populate the full plan document
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.height = req.body.height || user.height;
  user.weight = req.body.weight || user.weight;
  user.goal = req.body.goal || user.goal;

  await user.save();
  res.json(user);
};

/* ADD NOTE */
export const addNote = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.notes.push({ text: req.body.text });
  await user.save();
  res.json(user.notes);
};

/* DELETE NOTE */
export const deleteNote = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.notes = user.notes.filter(
    (note) => note._id.toString() !== req.params.id
  );
  await user.save();
  res.json(user.notes);
};


export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePic = req.file.path; 
    await user.save();

    res.status(200).json({ message: "Profile picture updated", profilePic: user.profilePic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const buyPlan = async (req, res) => {
  try {
    const userId = req.user._id;
    const { planId, planType } = req.body; 

    
    if (!["monthly", "yearly"].includes(planType)) {
      return res.status(400).json({ message: "Invalid plan type" });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const user = await User.findById(userId);

    
    const isSamePlan =
      user.activePlan?.toString() === planId &&
      user.planType === planType &&
      user.planEnd &&
      new Date() <= user.planEnd;

    if (isSamePlan) {
      return res.status(400).json({
        message: "This plan is already active",
      });
    }

    
    const startDate = new Date();
    const endDate = new Date(startDate);

    if (planType === "monthly") {
      endDate.setDate(endDate.getDate() + 30);
    } else {
      endDate.setDate(endDate.getDate() + 365);
    }

   
    user.activePlan = plan._id;
    user.planType = planType;
    user.planStart = startDate;
    user.planEnd = endDate;
    user.isActive = true;

    await user.save();

    res.json({
      message: "Plan purchased successfully",
      plan: plan.name,
      planType,
      validTill: endDate,
    });
  } catch (err) {
    console.error("Buy plan error:", err);
    res.status(500).json({ message: "Failed to purchase plan" });
  }
};