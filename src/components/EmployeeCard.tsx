import type { Employee } from "../types/Employee";

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({
  employee,
}: EmployeeCardProps) {
  const departmentColors: Record<string, string> = {
    IT: "border-blue-500",
    HR: "border-pink-500",
    Finance: "border-green-500",
    Marketing: "border-purple-500",
    Operations: "border-orange-500",
  };

  const borderColor =
    departmentColors[employee.department] || "border-gray-300";

  return (
    <div
      className={`bg-white border-l-4 ${borderColor} rounded-lg shadow-md p-5`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800">
          {employee.name}
        </h3>

        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            employee.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {employee.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="text-gray-600 mb-2">
        {employee.role}
      </p>

      <p className="text-sm text-gray-500">
        Departemen:{" "}
        <span className="font-medium text-gray-700">
          {employee.department}
        </span>
      </p>
    </div>
  );
}