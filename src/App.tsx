import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import VehicleList from "./pages/VehicleList";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/vehicles" element={<VehicleList />} />
      </Route>

      <Route
        path="/"
        element={<Navigate to="/vehicles" replace />}
      />
    </Routes>
  );
}