import { useState, useEffect } from "react";
import axios from "axios";

import VehicleCard from "./components/VehicleCard";
import VehicleForm from "./components/VehicleForm";


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

export default function App() {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
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

    fetchVehicles();
  }, []); 

  
  const handleAddVehicle = (vehicleData: {
    name: string;
    brand: string;
    plateNumber: string;
    transmission: string;
    category: string;
  }) => {
    const newVehicle: Vehicle = {
      id: crypto.randomUUID(),
      name: vehicleData.name,
      brand: vehicleData.brand,
      plateNumber: vehicleData.plateNumber,
      transmission: vehicleData.transmission,
      category: {
        id: crypto.randomUUID(),
        name: vehicleData.category,
      },
    };

    setVehicles((prevVehicles) => [
      ...prevVehicles,
      newVehicle,
    ]);
  };

  
  if (isLoading) {
    return (
      <div className="p-8 text-center text-blue-500 font-bold">
        Memuat Data Kendaraan...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-100">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Katalog Kendaraan Rent Car
      </h1>

      {}
      <div className="mb-8">
        <VehicleForm onAddVehicle={handleAddVehicle} />
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
          />
        ))}
      </div>
    </div>
  );
}