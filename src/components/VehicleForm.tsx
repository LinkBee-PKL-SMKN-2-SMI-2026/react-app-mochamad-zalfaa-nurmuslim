import { useForm } from "react-hook-form";

interface VehicleFormData {
  name: string;
  brand: string;
  plateNumber: string;
  transmission: string;
  category: string;
}

interface VehicleFormProps {
  onAddVehicle: (vehicle: VehicleFormData) => void;
}

export default function VehicleForm({
  onAddVehicle,
}: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<VehicleFormData>();

  const onSubmit = (data: VehicleFormData) => {
    onAddVehicle(data);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Tambah Kendaraan
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {}
        <div>
          <label className="block mb-1 font-semibold">
            Nama Kendaraan
          </label>

          <input
            {...register("name")}
            type="text"
            placeholder="Contoh: Avanza"
            className="w-full border rounded p-2"
          />
        </div>

        {}
        <div>
          <label className="block mb-1 font-semibold">
            Merek
          </label>

          <input
            {...register("brand")}
            type="text"
            placeholder="Contoh: Toyota"
            className="w-full border rounded p-2"
          />
        </div>

        {}
        <div>
          <label className="block mb-1 font-semibold">
            Nomor Plat
          </label>

          <input
            {...register("plateNumber")}
            type="text"
            placeholder="Contoh: B 1234 ABC"
            className="w-full border rounded p-2"
          />
        </div>

        {}
        <div>
          <label className="block mb-1 font-semibold">
            Transmisi
          </label>

          <select
            {...register("transmission")}
            className="w-full border rounded p-2"
          >
            <option value="">
              Pilih Transmisi
            </option>

            <option value="MANUAL">
              MANUAL
            </option>

            <option value="AUTOMATIC">
              AUTOMATIC
            </option>
          </select>
        </div>

        {}
        <div>
          <label className="block mb-1 font-semibold">
            Kategori
          </label>

          <input
            {...register("category")}
            type="text"
            placeholder="Contoh: MPV"
            className="w-full border rounded p-2"
          />
        </div>

        {}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tambah Kendaraan
          </button>
        </div>
      </form>
    </div>
  );
}