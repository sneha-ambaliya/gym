import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // fetch user profile
  useEffect(() => {
    api.get("/users/profile")
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  // handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // upload to backend
  const uploadImage = async () => {
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await api.put("/users/profile-pic", formData);

      setUser((prev) => ({
        ...prev,
        profilePic: res.data.profilePic,
      }));

      setFile(null);
      setPreview(null);
      alert("Profile picture uploaded ");
    } catch (err) {
      alert("Upload failed ");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-white">Loading...</p>;

  const plan = user.activePlan;

  // 🔥 Expiry check
  const isExpired =
    user.planEnd && new Date(user.planEnd) < new Date();

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-2xl max-w-sm mx-auto">
      {/* Profile */}
      <img
        src={preview || user.profilePic || "https://via.placeholder.com/100"}
        alt="Profile"
        className="w-24 h-24 rounded-full border-2 border-[#FF6A00] object-cover"
      />

      <input
        type="file"
        accept="image/*"
        className="mt-3 text-sm text-white"
        onChange={handleFileChange}
      />

      <button
        onClick={uploadImage}
        disabled={loading}
        className={`mt-3 w-full py-2 rounded font-medium ${
          loading
            ? "bg-gray-500"
            : "bg-[#FF6A00] hover:bg-[#FF8C1A]"
        }`}
      >
        {loading ? "Uploading..." : "Upload Photo"}
      </button>

      <h2 className="mt-4 text-xl text-[#F5F5F5]">{user.name}</h2>
      <p className="text-[#9E9E9E]">{user.email}</p>

      {/* ===== PLAN DETAILS ===== */}
      {plan ? (
        <div className="mt-5 bg-[#111111] p-4 rounded-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[#F5F5F5]">
              {plan.name}
            </h3>

            {/* Plan Badge */}
            <span
              className={`text-xs px-2 py-1 rounded ${
                isExpired
                  ? "bg-red-500 text-white"
                  : "bg-[#FF6A00] text-[#111111]"
              }`}
            >
              {isExpired ? "Expired" : user.planType}
            </span>
          </div>

          <p className="text-[#9E9E9E] mt-1">
            {user.planType === "monthly"
              ? `$${plan.monthlyPrice} / month`
              : `$${plan.yearlyPrice} / year`}
          </p>

          {user.planEnd && (
            <p className="text-xs text-[#9E9E9E] mt-1">
              Expires on:{" "}
              {new Date(user.planEnd).toLocaleDateString()}
            </p>
          )}

          {/* Features */}
          <div
            className={`mt-3 space-y-2 ${
              isExpired ? "opacity-40" : ""
            }`}
          >
            {plan.features.map((f) => (
              <p
                key={f}
                className="flex items-center gap-2 text-[#9E9E9E]"
              >
                <MdOutlineDone className="text-[#FF6A00]" />
                {f}
              </p>
            ))}

            {plan.disabledFeatures?.map((f) => (
              <p
                key={f}
                className="flex items-center gap-2 text-[#9E9E9E]/50"
              >
                <RxCross1 />
                {f}
              </p>
            ))}
          </div>

          {/* 🔥 Dynamic Button */}
          <button
            onClick={() => navigate("/")}
            className={`mt-4 w-full py-2 rounded font-medium ${
              isExpired
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-[#FF6A00] hover:bg-[#FF8C1A] text-[#111111]"
            }`}
          >
            {isExpired ? "Renew Plan" : "Change Plan"}
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-[#9E9E9E]">No active plan</p>
          <button
            onClick={() => navigate("/")}
            className="mt-3 w-full py-2 rounded bg-[#FF6A00] hover:bg-[#FF8C1A] text-[#111111]"
          >
            Buy a Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;