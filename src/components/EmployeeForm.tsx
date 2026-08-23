import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { Employee } from "../types/Employee";

interface EmployeeFormInputs {
  name: string;
  role: string;
  department: string;
}

interface EmployeeFormProps {
  onAddEmployee: (newEmployee: Employee) => void;
}

export default function EmployeeForm({
  onAddEmployee,
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormInputs>();

  const onSubmit: SubmitHandler<EmployeeFormInputs> = (data) => {
    const newEmployee: Employee = {
      id: Date.now(),
      name: data.name,
      role: data.role,
      department: data.department,
      isActive: true,
    };

    onAddEmployee(newEmployee);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-bold mb-5">
        Tambah Karyawan
      </h2>

      {/* Nama */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Nama Lengkap
        </label>

        <input
          type="text"
          {...register("name", {
            required: "Nama tidak boleh kosong!",
          })}
          className={`w-full border p-2 rounded ${
            errors.name
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Misal: Budi Santoso"
        />

        {errors.name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Role / Jabatan
        </label>

        <input
          type="text"
          {...register("role", {
            required: "Role wajib diisi!",
          })}
          className={`w-full border p-2 rounded ${
            errors.role
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Misal: Frontend Developer"
        />

        {errors.role && (
          <p className="text-red-500 text-xs mt-1">
            {errors.role.message}
          </p>
        )}
      </div>

      {/* Department */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Departemen
        </label>

        <select
          {...register("department", {
            required: "Departemen wajib dipilih!",
          })}
          className={`w-full border p-2 rounded ${
            errors.department
              ? "border-red-500"
              : "border-gray-300"
          }`}
        >
          <option value="">Pilih Departemen</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </select>

        {errors.department && (
          <p className="text-red-500 text-xs mt-1">
            {errors.department.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
      >
        Simpan Data
      </button>
    </form>
  );
}