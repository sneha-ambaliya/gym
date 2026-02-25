const PlanRow = ({ plan, onDelete, onEdit }) => {
  return (
    <tr className="border-b border-[#2A2A2A] text-[#F5F5F5]">
      <td className="py-4 font-medium">{plan.name}</td>
      <td className="py-4 text-center">${plan.monthlyPrice}</td>
      <td className="py-4 text-center">${plan.yearlyPrice}</td>
      <td className="py-4 text-center">
        {plan.isPopular ? (
          <span className="bg-[#FF6A00] text-[#111111] px-3 py-1 rounded text-xs">
            Yes
          </span>
        ) : (
          <span className="text-[#9E9E9E]">No</span>
        )}
      </td>
      <td className="py-4 text-right space-x-3">
        <button
          className="text-[#FF6A00] hover:text-[#FF8C1A] transition"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:text-red-400 transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PlanRow;
