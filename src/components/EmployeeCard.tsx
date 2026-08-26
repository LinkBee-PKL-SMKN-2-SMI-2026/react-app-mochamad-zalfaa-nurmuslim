interface EmployeeProps {
  name: string;
  role: string;
  isActive: boolean;
  department: string; 
}

const departmentColors: Record<string, string> = {
  IT: "border-blue-500",
  HR: "border-pink-500",
  Finance: "border-green-500",
  Marketing: "border-yellow-500",
  Operations: "border-purple-500",
};

export default function EmployeeCard({ name, role, isActive, department }: EmployeeProps) {
  const borderColorClass = departmentColors[department] || "border-gray-300";

  return (
    <div className={`p-5 border-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-all ${borderColorClass}`}>
      <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
        {name}
      </h2>
      
      {
        
      }
      <div className="space-y-2 text-sm text-gray-600">
        <div className="grid grid-cols-[70px_10px_1fr] items-start">
          <span className="font-semibold">Role</span>
          <span>:</span>
          <span className="font-medium">{role}</span>
        </div>
        
        <div className="grid grid-cols-[70px_10px_1fr] items-start">
          <span className="font-semibold">Dept</span>
          <span>:</span>
          <span className="font-medium">{department}</span>
        </div>
        
        <div className="grid grid-cols-[70px_10px_1fr] items-center">
          <span className="font-semibold">Status</span>
          <span>:</span>
          <div>
            <span className={`inline-block px-2 py-0.5 text-[11px] font-bold rounded-md uppercase tracking-wider ${
              isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}