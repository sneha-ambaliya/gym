import React from "react";
import {
  BadgeCheck,
  Dumbbell,
  ClipboardList,
  Activity,
  Apple,
  MapPin,
} from "lucide-react";
import model from "../assets/model.png";

const leftFeatures = [
  {
    icon: <BadgeCheck size={22} />,
    title: "Certified Expert Coaches",
    desc: "Train with certified professionals who guide you effectively.",
  },
  {
    icon: <Dumbbell size={22} />,
    title: "State-Of-Art Equipment",
    desc: "Train with the latest machines for better results.",
  },
  {
    icon: <ClipboardList size={22} />,
    title: "Personalized Fitness Plans",
    desc: "Get a plan tailored to your body, lifestyle, and goals.",
  },
];

const rightFeatures = [
  {
    icon: <Activity size={22} />,
    title: "Proven Transformation",
    desc: "Join hundreds who've achieved real and lasting results here.",
  },
  {
    icon: <Apple size={22} />,
    title: "Nutrition & Guidance",
    desc: "Receive expert tips on meals, recovery, and overall wellness.",
  },
  {
    icon: <MapPin size={22} />,
    title: "Convenient Location & Hour",
    desc: "Train anytime with easy access and extended opening hours.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#1E1E1E] py-24 px-6 md:px-16">
      
      {/* Tag */}
      <div className="text-center mb-6">
        <span className="text-[#FF6A00] text-sm font-medium">
          Why Choose Us
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-center text-3xl md:text-5xl font-bold text-[#F5F5F5] mt-5">
        WHY WE'RE THE{" "}<br/>
        <span className="text-[#FF6A00]">RIGHT FIT</span>{" "}
        FOR YOU
      </h2>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 items-center ">

  {/* RIGHT SIDE */}
  <div className="space-y-14">
    {rightFeatures.map((item, index) => (
      <div key={index} className="flex items-start gap-4 group cursor-pointer">

        {/* Text */}
        <div className="flex-1">
          <h4 className="text-[#F5F5F5] font-semibold text-xl">
            {item.title}
          </h4>
          <p className="text-[#9E9E9E] text-sm mt-2 leading-relaxed">
            {item.desc}
          </p>
        </div>

        {/* Icon */}
        <div className="min-w-[55px] h-[55px] flex items-center justify-center 
bg-[#FF6A00] rounded-full text-white
transition-transform duration-700
group-hover:rotate-[360deg]">
  {item.icon}
</div>

      </div>
    ))}
  </div>

  {/* CENTER IMAGE */}
  <div className="flex justify-center">
    <img
      src={model}
      alt="Gym"
      className="max-h-[450px] object-cover"
    />
  </div>

   {/* LEFT SIDE */}
  <div className="space-y-14">
    {leftFeatures.map((item, index) => (
      <div key={index} className="flex items-start gap-4 group cursor-pointer">

        {/* Icon */}
        <div className="min-w-[55px] h-[55px] flex items-center justify-center 
bg-[#FF6A00] rounded-full text-white
transition-transform duration-700
group-hover:rotate-[360deg]">
  {item.icon}
</div>

        {/* Text */}
        <div className="flex-1">
          <h4 className="text-[#F5F5F5] font-semibold text-xl">
            {item.title}
          </h4>
          <p className="text-[#9E9E9E] text-sm mt-2 leading-relaxed">
            {item.desc}
          </p>
        </div>

      </div>
    ))}
  </div>

 

</div>

     

    </section>
  );
};

export default WhyChooseUs;
