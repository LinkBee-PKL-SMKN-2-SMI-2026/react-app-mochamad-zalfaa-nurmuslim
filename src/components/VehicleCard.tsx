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
}

export default function VehicleCard({
  vehicle,
}: VehicleCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-blue-500">
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
    </div>
  );
}