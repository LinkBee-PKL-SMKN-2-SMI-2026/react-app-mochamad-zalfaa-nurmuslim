import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { useAuthStore } from "../store/useAuthStore";

interface LoginFormInputs {
  email: string;
  password: string;
}
