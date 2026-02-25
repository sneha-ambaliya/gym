import heroImg from "../assets/heroo.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="min-h-screen flex flex-col justify-between pt-0 overflow-hidden"
      style={{ backgroundColor: "#1E1E1E", color: "#F5F5F5" }}
    >
      {/* HERO CONTENT */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center ml-8">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="
                font-bold leading-[1.15]
                text-[clamp(2rem,4vw,3.5rem)]
                max-w-[clamp(320px,40vw,520px)]
              "
            >
              <span style={{ color: "#FF6A00" }}>The Ultimate</span> Online
              <br className="hidden sm:block" />
              Personal Training Plans
            </h1>

            <p
              className="text-sm mt-6 max-w-md"
              style={{ color: "#9E9E9E" }}
            >
              Stay in shape even at home, emergency will help you be stay
              healthy easily anywhere and whenever exercise helping people
              achieve their fitness healthy.
            </p>

            {/* BUTTON */}
            <motion.div
              className="flex gap-6 mt-8 items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glow px-4 py-1.5 rounded-lg text-sm shadow-lg"
                style={{ backgroundColor: "#FF6A00", color: "#111111" }}
              >
                <a href="#pricing">Start Your Training</a>
              </motion.button>
            </motion.div>

            {/* STATS */}
            <motion.div
              className="flex flex-wrap gap-8 mt-12 text-center"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
              }}
            >
              {[
                ["32+", "million workouts"],
                ["400+", "free workout videos"],
                ["28+", "years of experience"],
              ].map(([num, text]) => (
                <motion.div
                  key={num}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold">{num}</h2>
                  <p className="text-sm" style={{ color: "#9E9E9E" }}>
                    {text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center items-center h-[520px] md:h-[600px] mr-10">
            <motion.div
              className="absolute rounded-full blur-3xl opacity-80"
              style={{
                width: "650px",
                height: "650px",
                background:
                  "radial-gradient(circle, #FF8C1A 0%, #FF6A00 45%, rgba(255,106,0,0.15) 65%, transparent 75%)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.85, scale: 1.08 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />

            <motion.img
              src={heroImg}
              alt="Fitness"
              className="
                relative 
                h-[500px] w-[500px] sm:w-[420px] md:w-[560px] lg:w-[720px] xl:w-[840px] 2xl:w-[40vw] max-w-[1100px] mt-8
              "
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: [0, -18, 0],
                scale: 1,
              }}
              transition={{
                opacity: { duration: 1, ease: "easeOut" },
                scale: { duration: 1, ease: "easeOut" },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              }}
              whileHover={{ rotateY: -8, rotateX: 4, scale: 1.03 }}
              style={{
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.7))",
              }}
            />
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP (NO OVERLAP NOW) */}
      <div
        className="w-full py-5 -mt-13 z-20"
        style={{ backgroundColor: "#FF6A00" }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 text-sm md:text-base font-semibold text-black">
          <div className="flex items-center gap-2">
            <span>✦</span>
            <span>1200+ Members Transformed</span>
          </div>

          <div className="flex items-center gap-2">
            <span>✦</span>
            <span>10+ Years Experience</span>
          </div>

          <div className="flex items-center gap-2">
            <span>✦</span>
            <span>Certified Trainers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
