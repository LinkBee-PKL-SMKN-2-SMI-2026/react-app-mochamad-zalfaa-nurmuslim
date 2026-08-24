import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import VehicleList from "./pages/VehicleList";
import VehicleAdd from "./pages/VehicleAdd";
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicles/new" element={<VehicleAdd />} />
      </Route>

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/vehicles" element={<VehicleList />} />
          </Route>
        </Route>
      </Routes>

      <Route
        path="/"
        element={<Navigate to="/vehicles" replace />}
      />
    </Routes>

  );
}