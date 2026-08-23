import axios from "axios";

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

interface VehicleCardProps {
  vehicle: Vehicle;
  onDeleteSuccess: () => void;
}

export default function VehicleCard({
  vehicle,
  onDeleteSuccess,
}: VehicleCardProps) {

  // Token Dummy


  const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ODc0NmQyMC1lZTZjLTQzMjUtYWEwOC1lYzg2N2IxODM0ZmUiLCJlbWFpbCI6ImFkbWluQHJlbnRjYXIuY29tIiwiaWF0IjoxNzg3NDY5NDAxLCJleHAiOjE3ODc0NzAzMDF9.Nn0IhTcDgDfPaQEw8MLqvrGdepNxmXWDtZDX7-O9maY";

  const handleDelete = async (vehicleId: string) => {
    
    // Konfirmasi sebelum menghapus

    if (
      !window.confirm(
        "Yakin ingin menghapus kendaraan ini?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(
        `https://rent-car-pkl.linkbee.id/api/vehicles/${vehicleId}`,
        {
          headers: {
            Authorization: `Bearer ${TEMP_TOKEN}`,
          },
        }
      );

      alert("Kendaraan berhasil dihapus");

      // Memanggil fetchVehicles() dari App.tsx

      onDeleteSuccess();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Gagal menghapus data"
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-blue-500 relative">
      <h2 className="text-xl font-bold">
        {vehicle.brand} {vehicle.name}
      </h2>

      <p className="text-gray-600">
        Plat: {vehicle.plateNumber}
      </p>

      <div className="mt-2 flex gap-2">
        <span className="px-2 py-1 text-xs font-semibold bg-gray-100 rounded">
          {vehicle.transmission}
        </span>

        <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
          {vehicle.category.name}
        </span>
      </div>


      {}
      <button
        onClick={() => handleDelete(vehicle.id)}
        className="mt-4 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
      >
        Hapus
      </button>
    </div>
  );
}