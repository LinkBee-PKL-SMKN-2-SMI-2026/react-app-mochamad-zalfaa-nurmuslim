import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import VehicleList from "./pages/VehicleList";
import VehicleAdd from "./pages/VehicleAdd";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/new" element={<VehicleAdd />} />
        </Route>
      </Route>

      <Route
        path="/"
        element={<Navigate to="/vehicles" replace />}
      />
    </Routes>
  );
}