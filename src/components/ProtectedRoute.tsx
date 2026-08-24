import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
export default function ProtectedRoute() {
const { token } = useAuthStore();
if (!token) return <Navigate to="/login" replace />; // Tendang ke login
return <Outlet />; // Persilakan masuk
}