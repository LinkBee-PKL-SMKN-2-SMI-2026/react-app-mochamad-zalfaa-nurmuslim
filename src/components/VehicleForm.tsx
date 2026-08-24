import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form";

interface VehicleFormInputs {
  name: string;
  brand: string;
  plateNumber: string;
  transmission: string;
  categoryId: string;
}

interface VehicleFormProps {
  onSuccess: () => void;
}

export default function VehicleForm({
  onSuccess,
}: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<VehicleFormInputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Token Dummy

  // Ganti dengan token ADMIN yang kamu dapat dari token.html

  const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ODc0NmQyMC1lZTZjLTQzMjUtYWEwOC1lYzg2N2IxODM0ZmUiLCJlbWFpbCI6ImFkbWluQHJlbnRjYXIuY29tIiwiaWF0IjoxNzg3NDY5NDAxLCJleHAiOjE3ODc0NzAzMDF9.Nn0IhTcDgDfPaQEw8MLqvrGdepNxmXWDtZDX7-O9maY";

  const onSubmit: SubmitHandler<VehicleFormInputs> = async (data) => {
    try {
      setIsSubmitting(true);

      await axios.post(
        "https://rent-car-pkl.linkbee.id/api/vehicles",
        data,
        {
          headers: {
            Authorization: `Bearer ${TEMP_TOKEN}`,
          },
        }
      );

      alert("Berhasil menambah kendaraan!");

      reset();

      // Memanggil fetchVehicles() dari App.tsx

      onSuccess();
    } catch (error: any) {
      console.error("Gagal menyimpan:", error);

      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan sistem"
      );
    } finally {
      setIsSubmitting(false);
    }
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
            {...register("name", {
              required: "Nama kendaraan wajib diisi",
            })}
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
            {...register("plateNumber", {
              required: "Nomor plat wajib diisi",
            })}
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

         <select {...register("categoryId", { required: true })}>
          <option value="">Pilih kategori</option>
            <option value="7fdb7fdb-4a93-4c78-858b-32c6457aa15b">
            Sedan
            </option>
              <option value="38c39f36-bc42-4d60-b33e-63c31be26320">
              MPV
              </option>
                <option value="04cc14b0-6964-497a-b30f-57e37f5c26d6">
                SUV
                </option>
                  <option value="239c63b2-a2e8-41cf-ad50-d0dd2fc44ed8">
                  Pickup
                  </option>
          </select>
        </div>

           
        {}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting
              ? "Menyimpan..."
              : "Tambah Kendaraan"}
          </button>
        </div>
      </form>
    </div>
  );
}