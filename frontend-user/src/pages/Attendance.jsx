
import ScanQR from "../components/ScanQR";

const Attendance = () => {
  return (
    <>
      <h1 className="text-4xl font-[Bebas_Neue] mb-6">
        Attendance
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <ScanQR/>
        
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
      </div>
    </>
  );
};

export default Attendance;
