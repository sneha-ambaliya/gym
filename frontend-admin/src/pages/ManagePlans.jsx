import { useEffect, useState } from "react";
import axios from "axios";
import PlanRow from "./PlanRow.jsx";
import EditPlanModal from "./EditPlanModal.jsx"; 

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingPlan, setEditingPlan] = useState(null); 

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/plans");
      setPlans(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || " Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/plans/${id}`);
      setMessage(" Plan deleted successfully!");
      fetchPlans();
    } catch (err) {
      setMessage(err.response?.data?.message || " Failed to delete plan");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] p-6">
      <h2 className="text-2xl font-semibold text-[#F5F5F5] mb-6">
        Manage Plans
      </h2>

      {message && (
        <p className="text-sm text-[#9E9E9E] mb-4">{message}</p>
      )}

      <div className="bg-[#1E1E1E] rounded-xl p-6 overflow-x-auto">
        {loading ? (
          <p className="text-[#9E9E9E]">Loading plans...</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#9E9E9E] border-b border-[#2A2A2A]">
                <th className="pb-3 text-left">Plan</th>
                <th className="pb-3 text-center">Monthly</th>
                <th className="pb-3 text-center">Yearly</th>
                <th className="pb-3 text-center">Popular</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {plans.length > 0 ? (
                plans.map((plan) => (
                  <PlanRow
                    key={plan._id}
                    plan={plan}
                    onDelete={() => handleDelete(plan._id)}
                    onEdit={() => setEditingPlan(plan)}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-[#9E9E9E]"
                  >
                    No plans found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit modal */}
      {editingPlan && (
        <EditPlanModal
          plan={editingPlan}
          onClose={() => setEditingPlan(null)}
          onUpdated={fetchPlans} // refresh list after edit
        />
      )}
    </div>
  );
};

export default ManagePlans;
