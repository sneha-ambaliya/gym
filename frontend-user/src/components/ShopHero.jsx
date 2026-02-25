import React from "react";
import modelImg from "../assets/shopModel.png"; 
import shoeImg from "../assets/shoe.png";  
import supplementImg from "../assets/supli.png"; 

const ShopHero = () => {
  return (
    <section className="min-h-screen bg-[#1E1E1E] text-[#F5F5F5] overflow-hidden flex items-center">

      
      <div className=" bg-gradient-to-r from-[#111111] via-[#1E1E1E] to-[#111111] opacity-80"></div>

      <div className=" w-full max-w-7xl mx-auto mt-4 grid grid-cols-1 lg:grid-cols-3  ">

        
        <div className="flex justify-center lg:justify-start">
          <img
            src={modelImg}
            alt="Fitness Model"
            className="w-[380px] lg:w-[450px] object-contain"
          />
        </div>

       
        <div className="text-center lg:text-left space-y-6 mt-30 ml-15 flex items-center flex-col">

          <h1 className="absolute text-[77px] font-extrabold tracking-wide leading-tight font-[Bebas_Neue] ">
            GEAR UP. TRAIN HARD.
          </h1>

          <p className=" relative text-[#9E9E9E] text-lg top-22">
            Premium Fitness Apparel & Equipment
          </p>

          <button className="relative top-28 mt-6 px-8 py-3 bg-[#FF6A00] text-white font-semibold rounded-md shadow-lg transition duration-300 hover:bg-[#FF8C1A]">
            <a href="#product">EXPLORE THE SHOP</a>
          </button>

        </div>

        
        <div className="flex gap-5 flex-col mt-15 items-end w-auto mr-5">

          
          <div className="bg-[#1E1E1E] border-4 border-[#FF6A00] rounded-xl p-6 w-64 shadow-[0_0_20px_rgba(255,106,0,0.3)]">
            <img
              src={shoeImg}
              alt="Shoe"
              className="w-32 mx-auto mb-4"
            />
            <h3 className="text-sm font-medium text-center">
              Caplign Mrahani...
            </h3>
            <p className="text-[#9E9E9E] text-center text-sm mt-1">
              $82.30
            </p>
          </div>

         
          <div className="bg-[#1E1E1E] border-4 border-[#FF6A00] rounded-xl p-6 w-64 shadow-[0_0_20px_rgba(255,106,0,0.3)]">
            <img
              src={supplementImg}
              alt="Supplement"
              className="w-32 mx-auto mb-4"
            />
            <h3 className="text-sm font-medium text-center">
              Tranderj Mahand...
            </h3>
            <p className="text-[#9E9E9E] text-center text-sm mt-1">
              $93.00
            </p>
          </div>

        </div>
        

      </div>
    </section>
  );
};

export default ShopHero;
