import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../utils/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const QRScanner = () => {
  const scannerRef = useRef(null);
  const scannedRef = useRef(false);

  useEffect(() => {
    if (scannerRef.current) return;

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scannerRef.current.render(
      async (decodedText, decodedResult) => {
        const qrValue = decodedText || decodedResult?.decodedText;

        console.log("Scanned QR Data:", qrValue);
        console.log("Sending to backend:", qrValue);

        if (!qrValue || scannedRef.current) return;

        scannedRef.current = true;
      
        


        try {
          await api.post(
            "/attendance/scan",
            { qrData: qrValue },
            { withCredentials: true }
          );

          toast.success("Attendance marked");
        } catch (err) {
          scannedRef.current = false;
          toast.error(err.response?.data?.message || "Scan failed");
        }
      },
      () => {}
    );

    return () => {
      scannerRef.current?.clear().catch(() => {});
      scannerRef.current = null;
    };
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-white text-xl mb-4">Scan QR to Mark Attendance</h2>
       
      <div id="qr-reader" />
      <ToastContainer />
    </div>
  );
};

export default QRScanner;
 