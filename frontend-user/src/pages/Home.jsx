import CoachesSection from "../components/CoachesSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PricingSection from "../components/PricingSection";
import ServicesSection from "../components/ServicesSection";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
   <>
       <Hero/>
       <ServicesSection/>
       <WhyChooseUs/>
       <PricingSection/>
       <CoachesSection/>
       <Footer/>

   </>
  );
};

export default Home;
