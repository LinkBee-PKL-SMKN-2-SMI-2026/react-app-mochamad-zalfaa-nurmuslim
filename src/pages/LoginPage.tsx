import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { useAuthStore } from "../store/useAuthStore";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await api.post("/auth/login", data);

      const token = response.data.data.accessToken;

      login(token);

      alert("Login berhasil!");

      navigate("/vehicles");
    } catch (error: any) {
      console.error("Login gagal:", error);

      alert(
        error.response?.data?.message ||
          "Email atau password salah"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Rent Car Mariza
        </h1>

        <h2 className="mb-6 text-center text-xl font-semibold">
          Login
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block font-semibold">
              Email
            </label>

            <input
              {...register("email", {
                required: "Email wajib diisi",
              })}
              type="email"
              placeholder="admin@rentcar.com"
              className="w-full rounded border p-2"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block font-semibold">
              Password
            </label>

            <input
              {...register("password", {
                required: "Password wajib diisi",
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Login..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}