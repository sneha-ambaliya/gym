import React, { useState, useEffect } from "react";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import api from "../utils/api";
import { useRef } from "react";


const PricingSection = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePlanId, setActivePlanId] = useState(null);
  const [userPlanType, setUserPlanType] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");
      setPlans(res.data);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo?.activePlan) {
        setActivePlanId(userInfo.activePlan._id);
        setUserPlanType(userInfo.planType);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-[#111111] rounded-xl p-6 text-center text-[#9E9E9E]">
        Loading plans...
      </section>
    );
  }

  return (
    <section className="w-full bg-[#111111] rounded-xl p-6" id="pricing">
      <h1 className="text-4xl font-medium text-[#F5F4F3] text-center mt-10">
       Find the <span className="text-[#FF6A00]">Perfect Plan</span> for Your Fitness Goals
      </h1>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <span className="text-[#9E9E9E]">Monthly</span>

        <div
          onClick={() => setIsMonthly(!isMonthly)}
          className={`w-[55px] h-[28px] rounded-full cursor-pointer px-1 flex items-center transition ${
            isMonthly ? "bg-[#1E1E1E]" : "bg-[#FF6A00]"
          }`}
        >
          <div
            className={`w-[22px] h-[22px] bg-[#F5F5F5] rounded-full transition ${
              isMonthly ? "translate-x-0" : "translate-x-[26px]"
            }`}
          />
        </div>

        <span className="text-[#9E9E9E]">Yearly</span>
      </div>

      {/* Plans */}
      <div className="flex flex-wrap justify-center gap-8 mt-5 mb-10">
        {plans.map((plan) => {
          const planType = isMonthly ? "monthly" : "yearly";
          const price =
            planType === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

          const isActive =
            plan._id === activePlanId && userPlanType === planType;

          return (
            <div
              key={plan._id}
              className={`max-w-[280px] w-full rounded-xl p-6 ${
                plan.isPopular
                  ? "backdrop-blur-xl bg-gradient-to-b from-[#1D1D1D] to-[#FF6A00] text-[#F5F5F5]"
                  : "backdrop-blur-xl bg-white/5 text-[#F5F5F5]"
              }`}
            >
              <h3 className="text-xl font-semibold">{plan.name}</h3>

              <FeatureList
                features={plan.features}
                disabled={plan.disabledFeatures}
                active={plan.isPopular}
              />

              <PriceBlock
                price={price}
                plan={plan}
                planType={planType}
                isActive={isActive}
                onActivate={() => {
                  setActivePlanId(plan._id);
                  setUserPlanType(planType);
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

const FeatureList = ({ features, disabled = [], active }) => (
  <div className="mt-5 space-y-2">
    {features.map((item) => (
      <p
        key={item}
        className={`flex items-center gap-2 ${
          active ? "text-[#9E9E9E]" : "text-[#9E9E9E]"
        }`}
      >
        <MdOutlineDone className="text-[#FF6A00]" />
        {item}
      </p>
    ))}

    {disabled.map((item) => (
      <p key={item} className="flex items-center gap-2 text-[#9E9E9E]/50">
        <RxCross1 />
        {item}
      </p>
    ))}
  </div>
);

const PriceBlock = ({ price, plan, planType, isActive, onActivate }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    try {
      setLoading(true);
      setMessage("");

      // 1️⃣ Create Razorpay order
      const { data } = await api.post("/plans/create-order/", {
        planId: plan._id,
        planType,
      });
 
      const options = {
        key: "rzp_test_SCpiphTN0stUCX", 
        amount: data.amount,
        currency: "INR",
        name: "Gym App",
        description: plan.name,
        order_id: data.orderId,

        handler: async (response) => {
  await api.post("/plans/verify-payment/", {
    planId: plan._id,
    planType,
    amount: price,
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature, 
  });

  setMessage(" Plan activated");
  onActivate();
},
        theme: { color: "#FF6A00" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setMessage(" Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-end gap-2">
        <h3 className="text-2xl font-extrabold">₹{price}</h3>
        <span className="text-sm opacity-70">/{planType}</span>
      </div>

      {message && <p className="text-sm mt-2">{message}</p>}

      <button
  onClick={handleBuy}
  disabled={loading || isActive}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  }}
  className={`relative w-full py-3 mt-4 rounded-md font-medium overflow-hidden will-change-transform transition-all duration-700 group
    ${
      isActive
        ? "bg-[#1E1E1E] text-[#9E9E9E] cursor-not-allowed"
        : "bg-[#111111] text-[#F5F5F5]"
    }
  `}
>
  {!isActive && (
    <span
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background:
          "radial-gradient(600px circle at var(--x) var(--y), rgba(255,106,0,0.9), transparent 60%)",
      }}
    />
  )}

  <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
    {isActive ? "Active" : loading ? "Processing..." : "Choose"}
  </span>
</button>
    </div>
  );
};

export default PricingSection;
