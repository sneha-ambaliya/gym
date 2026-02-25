import { useEffect, useState } from "react";
import { Legend } from "recharts";
import {
  Users,
  IndianRupee,
  TrendingUp,
  Activity,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import api from "../utils/api";

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-[#1E1E1E] rounded-2xl p-5 flex items-center gap-5 justify-between hover:scale-[1.02] transition">
    <div>
      <p className="text-[#9E9E9E] text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-[#F5F5F5]">{value}</h3>
    </div>
    <div className="bg-[#FF6A00]/20 p-3 rounded-xl">
      <Icon className="text-[#FF6A00]" size={28} />
    </div>
  </div>
);

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/dashboard/stats");
        setStats(data);
        console.log("Dashboard stats:", data);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111111] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-[#9E9E9E] mt-1">
          Overview of gym performance & revenue
        </p>
      </div>

      {/* Stats */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
  
  <StatCard
    title="Plan Revenue"
    value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`}
    icon={IndianRupee}
  />

  <StatCard
    title="Order Revenue"
    value={`₹${(stats?.orderRevenue || 0).toLocaleString()}`}
    icon={IndianRupee}
  />

  <StatCard
    title="Total Revenue"
    value={`₹${(stats?.combinedRevenue || 0).toLocaleString()}`}
    icon={TrendingUp}
  />

  <StatCard
    title="Active Members"
    value={stats?.activeMembers || 0}
    icon={Activity}
  />

  <StatCard
    title="Total Users"
    value={stats?.totalUsers || 0}
    icon={Users}
  />

</div>

      {/* Chart */}
      <div className="bg-[#1E1E1E] rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Revenue Analytics
        </h2>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
  <AreaChart data={stats?.monthlyChart || []}>
    <CartesianGrid stroke="#2A2A2A" strokeDasharray="3 3" />
    
    <XAxis dataKey="month" stroke="#9E9E9E" />
    <YAxis stroke="#9E9E9E" />

    <Tooltip
      contentStyle={{
        backgroundColor: "#111111",
        border: "1px solid #FF6A00",
        color: "#F5F5F5",
      }}
    />

    {/* Plan Revenue */}
    <Area
      type="monotone"
      dataKey="planRevenue"
      stackId="1"
      stroke="#FF6A00"
      fill="#FF6A00"
      fillOpacity={0.6}
    />

    {/* Order Revenue */}
    <Area
      type="monotone"
      dataKey="orderRevenue"
      stackId="1"
      stroke="#00C49F"
      fill="#00C49F"
      fillOpacity={0.6}
    />
    <Legend />
  </AreaChart>
</ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
