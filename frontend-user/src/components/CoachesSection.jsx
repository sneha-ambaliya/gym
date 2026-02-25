import React from "react";
import m1 from "../assets/m1.avif";
import m2 from "../assets/m2.jpg";
import m3 from "../assets/m3.avif";
import m4 from "../assets/m4.jpeg";


const coaches = [
  {
    name: "Rayhan",
    role: "Nutrition & Wellness Coach",
    image:
      m1,
  },
  {
    name: "Rabbi",
    role: "Transformation Specialist",
    image:
      m2,
  },
  {
    name: "Samiul",
    role: "Functional Trainer",
    image:
      m3,
  },
  {
    name: "Maryam",
    role: "Strength & Conditioning Coach",
    image:
     m4,
  },
];

const CoachesSection = () => {
  return (
    <section className="bg-[#1E1E1E] py-24 px-6 md:px-16">
      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT INFO PANEL */}
        <div className="bg-[#111111] rounded-[30px] p-10 flex flex-col justify-center">
          
          <span className="bg-[#FF6A00] text-white px-5 py-2 rounded-full text-sm w-fit mb-6">
            Our Team
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] leading-tight">
            MEET YOUR <br />
            <span className="text-[#FF6A00]">
              DEDICATED
            </span>{" "}
            COACHES
          </h2>

          <p className="text-[#9E9E9E] mt-6 leading-relaxed">
            Through personalized coaching, cutting edge techniques,
            and unwavering support, we'll help you achieve the
            fitness goals you've always dreamed of.
          </p>

          <ul className="text-[#F5F5F5] mt-6 space-y-2 text-sm">
            <li>• Certified personal trainer</li>
            <li>• Nutrition specialist</li>
            <li>• Former competitive athlete</li>
            <li>• Helped 1200+ clients achieve their fitness goal</li>
          </ul>
        </div>

        {/* RIGHT GRID */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">

          {coaches.map((coach, index) => (
            <div
              key={index}
              className="relative rounded-[25px] overflow-hidden group"
            >
              
              {/* Image */}
              <img
                src={coach.image}
                alt={coach.name}
                className="h-[320px] w-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>

              {/* Name Tag */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#FF6A00] text-white px-6 py-3 rounded-full text-center w-[85%]">
                <h4 className="font-semibold text-lg">
                  {coach.name}
                </h4>
                <p className="text-sm opacity-90">
                  {coach.role}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CoachesSection;
