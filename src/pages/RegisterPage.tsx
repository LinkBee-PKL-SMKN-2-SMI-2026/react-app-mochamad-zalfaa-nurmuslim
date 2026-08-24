import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await api.post("/auth/register", data);

      alert("Registrasi berhasil! Silakan login.");

      navigate("/login");
    } catch (error: any) {
      console.error("Registrasi gagal:", error);

      alert(
        error.response?.data?.message ||
          "Registrasi gagal. Silakan coba lagi."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Rent Car Mariza
        </h1>

        <h2 className="mb-6 text-center text-xl font-semibold">
          Register
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Nama */}
          <div>
            <label className="mb-1 block font-semibold">
              Nama
            </label>

            <input
              {...register("name", {
                required: "Nama wajib diisi",
              })}
              type="text"
              placeholder="Masukkan nama"
              className="w-full rounded border p-2"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block font-semibold">
              Email
            </label>

            <input
              {...register("email", {
                required: "Email wajib diisi",
              })}
              type="email"
              placeholder="Masukkan email"
              className="w-full rounded border p-2"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block font-semibold">
              Password
            </label>

            <input
              {...register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 6,
                  message: "Password minimal 6 karakter",
                },
              })}
              type="password"
              placeholder="Masukkan password"
              className="w-full rounded border p-2"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Mendaftarkan..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}