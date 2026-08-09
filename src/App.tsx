// src/App.tsx
import EmployeeCard from './components/EmployeeCard';

export default function App() {
  const employees = [
   { id: 1, name: "Zalfaa", role: "Frontend Developer", isActive: true, department: "IT" },
   { id: 2, name: "Fawwaz", role: "Recruiter", isActive: true, department: "HR" },
   { id: 3, name: "Azis", role: "Accountant", isActive: false, department: "Finance" },
   { id: 4, name: "Ridho", role: "Content Creator", isActive: true, department: "Marketing" },
   { id: 5, name: "Arya", role: "Logistics Manager", isActive: true, department: "Operations" },
   { id: 6, name: "suMire", role: "Security", isActive: true, department: "General Affairs" },
  ];

  return (
    // Background seluruh halaman (abu-abu muda)
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      
      {/* Main Container putih di tengah layar */}
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center border-b-2 border-gray-100 pb-4">
          Daftar Karyawan
        </h1>

        {/* Grid Container untuk card */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {employees.map((emp) => (
            <EmployeeCard 
              key={emp.id} 
              name={emp.name}
              role={emp.role}
              isActive={emp.isActive}
              department={emp.department}
            />
          ))}
        </div>

      </div>
    </div>
  );
}