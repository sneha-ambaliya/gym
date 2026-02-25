import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { QrCode, RefreshCcw } from "lucide-react";
import api from "../utils/api";

const GenerateQR = () => {
  const [qrData, setQrData] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQR = async () => {
    try {
      setLoading(true);
      const res = await api.get("/attendance/generate-qr", {
        withCredentials: true,
      });

      setQrData(res.data.qrToken);
      console.log("QR fetched:", res.data.qrToken);
    } catch (err) {
      console.error("QR fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQR();
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] p-6 flex items-center justify-center">
      <div className="bg-[#1E1E1E] rounded-2xl p-8 w-full max-w-md shadow-lg">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#FF6A00]/20 p-3 rounded-xl">
            <QrCode className="text-[#FF6A00]" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Today’s Attendance QR</h2>
            <p className="text-[#9E9E9E] text-sm">
              Scan to mark attendance
            </p>
          </div>
        </div>

        {/* QR Box */}
        <div className="bg-white rounded-xl p-6 flex items-center justify-center mb-6">
          {qrData ? (
            <QRCode
              value={qrData}
              size={220}
              bgColor="#FFFFFF"   
              fgColor="#000000"  
            />
          ) : (
            <p className="text-[#9E9E9E]">Generating QR...</p>
          )}
        </div>

        {/* Action */}
        <button
          onClick={fetchQR}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-[#FF8C1A] transition text-black font-semibold py-3 rounded-xl disabled:opacity-60"
        >
          <RefreshCcw size={18} />
          {loading ? "Refreshing..." : "Refresh QR"}
        </button>
      </div>
    </div>
  );
};

export default GenerateQR;
