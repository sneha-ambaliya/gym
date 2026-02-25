import Footer from "../components/Footer";
import StoryHero from "../components/StoryHero";

const About = () => {
  return (
    <>
    <StoryHero/>
    <div className="max-w-4xl mx-auto p-6 my-20  ">
      <h1 className="text-6xl font-[Bebas_Neue] mb-6">About Us</h1>

      <p className="text-[#9E9E9E] leading-7">
        We are not just a gym we’re a fitness ecosystem.  
        From smart attendance to AI workout guidance,  
        GYMFLEX helps you stay consistent, motivated, and unstoppable.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {["Strength", "Discipline", "Consistency"].map((item) => (
          <div
            key={item}
            className="bg-[#1E1E1E] p-6 rounded-xl hover:-translate-y-2 hover:shadow-2xl transition"
          >
            <h3 className="text-xl text-[#FF6A00]">{item}</h3>
            <p className="text-sm text-[#9E9E9E] mt-2">
              We believe real change happens when you stay consistent.
            </p>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
     </>
  );
};

export default About;
