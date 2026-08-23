import { useEffect, useState } from "react";
import axios from "axios";

import VehicleCard from "../components/VehicleCard";

interface Category {
  id: string;
  name: string;
}

interface Vehicle {
  id: string;
  name: string;
  brand: string | null;
  plateNumber: string;
  transmission: string;
  category: Category;
}

export default function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        "https://rent-car-pkl.linkbee.id/api/vehicles"
      );

      setVehicles(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Gagal mengambil data:", err);

      setError(
        "Gagal memuat data dari server. Pastikan internet jalan."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-blue-500 font-bold">
        Memuat Data Kendaraan...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Katalog Kendaraan
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onDeleteSuccess={fetchVehicles}
          />
        ))}
      </div>
    </div>
  );
}