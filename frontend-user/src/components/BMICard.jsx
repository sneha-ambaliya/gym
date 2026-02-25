import { useState } from "react";
import api from "../utils/api";

const BMICard = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const save = async () => {
    await api.put("/users/profile", { height, weight });
    alert("Profile updated");
  };

  const bmi =
    height && weight ? (weight / ((height / 100) ** 2)).toFixed(1) : null;

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-2xl">
      <input
        placeholder="Height (cm)"
        className="w-full p-2 mb-2 bg-black"
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        placeholder="Weight (kg)"
        className="w-full p-2 mb-2 bg-black"
        onChange={(e) => setWeight(e.target.value)}
      />

      {bmi && <p>BMI: <span className="text-[#FF6A00]">{bmi}</span></p>}

      <button
        onClick={save}
        className="mt-3 w-full bg-[#FF6A00] py-2 font-[Anton]"
      >
        Save
      </button>
    </div>
  );
};

export default BMICard;
