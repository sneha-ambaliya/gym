import bgImage from "../assets/aboutBackground.png"; 
import headingIcon from "../assets/logo.png";
import { motion } from "framer-motion";

const StoryHero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-start text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="absolute inset-0 bg-black/70"></div>

      
      <div className="relative z-10 max-w-6xl mx-10 px-6">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* HEADING WITH IMAGE */}
          <div className="flex items-center  justify-start gap-0 mb-6">
            <img
              src={headingIcon}
              alt="Icon"
              className="w-26 md:w-29"
            />
            <h1 className="text-4xl md:text-6xl font-bold">
              OUR STORY
            </h1>
          </div>

          
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
            Forging Strength, Building Community
          </h2>

          
          <p className="max-w-2xl text-gray-300 leading-relaxed mb-8">
            At GYMFLEX we believe in unlocking potential. Founded in 2001,
            our journey began with creating a space where everyone can
            transform. We are more than a gym — we are a family dedicated to
            health, resilience, and growth.
          </p>

          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-md font-semibold shadow-lg"
            style={{
              backgroundColor: "#FF6A00",
              color: "#111111",
            }}
          >
            MEET OUR TEAM
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default StoryHero;
