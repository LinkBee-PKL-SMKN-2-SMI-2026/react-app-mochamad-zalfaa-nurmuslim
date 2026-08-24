import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";

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
  const queryClient = useQueryClient();

  const {
    data: vehicles = [],
    isLoading,
    isError,
    error,
  } = useQuery<Vehicle[]>({
    queryKey: ["vehicles"],

    queryFn: async () => {
      const response = await api.get("/vehicles");

      return response.data.data;
    },
  });

  const handleDelete = async (vehicleId: string) => {
    if (
      !window.confirm(
        "Yakin ingin menghapus kendaraan ini?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/vehicles/${vehicleId}`);

      alert("Kendaraan berhasil dihapus");

      queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Gagal menghapus kendaraan"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Gagal mengambil data kendaraan:{" "}
        {error instanceof Error
          ? error.message
          : "Terjadi kesalahan"}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Katalog Kendaraan
          </h1>

          <p className="mt-1 text-gray-600">
            Daftar kendaraan yang tersedia
          </p>
        </div>
      </div>

      {vehicles.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center shadow">
          Belum ada kendaraan.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="relative rounded-lg border-t-4 border-blue-500 bg-white p-4 shadow-md"
            >
              <h2 className="text-xl font-bold">
                {vehicle.brand} {vehicle.name}
              </h2>

              <p className="text-gray-600">
                Plat: {vehicle.plateNumber}
              </p>

              <div className="mt-2 flex gap-2">
                <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold">
                  {vehicle.transmission}
                </span>

                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                  {vehicle.category?.name}
                </span>
              </div>

              <button
                onClick={() =>
                  handleDelete(vehicle.id)
                }
                className="mt-4 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}