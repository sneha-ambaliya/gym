import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

export const getAdminStats = async (req, res) => {
  try {
    /* ===============================
       TOTAL PLAN REVENUE
    =============================== */
    const planRevenueAgg = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalRevenue = planRevenueAgg[0]?.total || 0;


    /* ===============================
       TOTAL ORDER REVENUE
    =============================== */
    const orderRevenueAgg = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const orderRevenue = orderRevenueAgg[0]?.total || 0;


    /* ===============================
       COMBINED REVENUE
    =============================== */
    const combinedRevenue = totalRevenue + orderRevenue;


    /* ===============================
       CURRENT MONTH REVENUE (PLAN + ORDER)
    =============================== */
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const monthlyPlanAgg = await Payment.aggregate([
      {
        $match: {
          status: "success",
          createdAt: { $gte: startOfMonth }
        }
      },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const monthlyOrderAgg = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: startOfMonth }
        }
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const monthlyRevenue =
      (monthlyPlanAgg[0]?.total || 0) +
      (monthlyOrderAgg[0]?.total || 0);


    /* ===============================
       USERS & ACTIVE MEMBERS
    =============================== */
    const totalUsers = await User.countDocuments();

    const activeMembers = await Payment.distinct("userId", {
      status: "success"
    });


    /* ===============================
       MONTHLY STACKED CHART DATA
    =============================== */

    // Plan revenue per month
    const monthlyPlanData = await Payment.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          planRevenue: { $sum: "$amount" }
        }
      }
    ]);

    // Order revenue per month
    const monthlyOrderData = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          orderRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    // Merge both datasets
    const monthlyMap = {};

    monthlyPlanData.forEach((item) => {
      const key = `${item._id.month}/${item._id.year}`;
      monthlyMap[key] = {
        month: key,
        planRevenue: item.planRevenue,
        orderRevenue: 0
      };
    });

    monthlyOrderData.forEach((item) => {
      const key = `${item._id.month}/${item._id.year}`;

      if (!monthlyMap[key]) {
        monthlyMap[key] = {
          month: key,
          planRevenue: 0,
          orderRevenue: item.orderRevenue
        };
      } else {
        monthlyMap[key].orderRevenue = item.orderRevenue;
      }
    });

    const monthlyChart = Object.values(monthlyMap).sort((a, b) => {
      const [m1, y1] = a.month.split("/");
      const [m2, y2] = b.month.split("/");
      return new Date(y1, m1 - 1) - new Date(y2, m2 - 1);
    });


    /* ===============================
       FINAL RESPONSE
    =============================== */
    res.json({
      totalRevenue,        // Plan revenue
      orderRevenue,        // Order revenue
      combinedRevenue,     // Total revenue
      monthlyRevenue,      // Current month combined
      totalUsers,
      activeMembers: activeMembers.length,
      monthlyChart
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
