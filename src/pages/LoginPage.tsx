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