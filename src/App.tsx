import { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeCard from "./components/EmployeeCard";
import type { Employee } from "./types/Employee";

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Frontend Developer",
    isActive: true,
    department: "IT",
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "HR Specialist",
    isActive: true,
    department: "HR",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    role: "Financial Analyst",
    isActive: false,
    department: "Finance",
  },
  {
    id: 4,
    name: "Rina Lestari",
    role: "Marketing Specialist",
    isActive: true,
    department: "Marketing",
  },
  {
    id: 5,
    name: "Doni Pratama",
    role: "Operations Staff",
    isActive: true,
    department: "Operations",
  },
];

export default function App() {
  const [employees, setEmployees] =
    useState<Employee[]>(initialEmployees);

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      newEmployee,
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Manajemen Karyawan
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div>
            <EmployeeForm
              onAddEmployee={handleAddEmployee}
            />
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Daftar Karyawan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {employees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}