import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../utils/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ScanQR = ({ onScanSuccess }) => {
  const scannerRef = useRef(null);
  const hasScannedRef = useRef(false);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const startScanner = async () => {
      if (scannerRef.current) return;

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 12, qrbox: 260 },
          async (decodedText) => {
            if (hasScannedRef.current) return;
            hasScannedRef.current = true;

            console.log(" QR RAW:", decodedText);

            try {
              await api.post("/attendance/scan", { qrToken: decodedText }, { withCredentials: true });
              toast.success("Attendance marked");

              if (onScanSuccess) onScanSuccess();

             
              if (isRunningRef.current) {
                await scanner.stop();
                await scanner.clear();
                isRunningRef.current = false;
              }
            } catch (err) {
              hasScannedRef.current = false;
              toast.error(err.response?.data?.message || "Scan failed");
            }
          }
        );

        isRunningRef.current = true; // mark scanner as running
      } catch (err) {
        console.error(" Scanner start error:", err);
      }
    };

    startScanner();

    return () => {
      //  Cleanup on unmount safely
      const cleanup = async () => {
        if (scannerRef.current && isRunningRef.current) {
          try {
            await scannerRef.current.stop();
            await scannerRef.current.clear();
          } catch (err) {
            console.warn("Scanner cleanup error:", err);
          }
          isRunningRef.current = false;
        }
      };
      cleanup();
    };
  }, [onScanSuccess]);

  return (
    <div>
      <ToastContainer />
      <div id="qr-reader" className="w-[320px] h-[320px] rounded-xl border-4 border-white" />;
    </div>
  );
};

export default ScanQR;
