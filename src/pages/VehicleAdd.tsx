import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface VehicleFormInputs {
  name: string;
  brand: string;
  plateNumber: string;
  transmission: string;
  categoryId: string;
}

export default function VehicleAdd() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<VehicleFormInputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Jangan commit token asli ke GitHub.
  // Gunakan token admin kamu secara lokal.
  const TEMP_TOKEN = "MASUKKAN_TOKEN_ADMIN_DI_SINI";

  const onSubmit: SubmitHandler<VehicleFormInputs> = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "https://rent-car-pkl.linkbee.id/api/vehicles",
        data,
        {
          headers: {
            Authorization: `Bearer ${TEMP_TOKEN}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Berhasil menambah kendaraan!");

        reset();

        navigate("/vehicles");
      }
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
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Tambah Kendaraan
      </h1>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div>
            <label className="mb-1 block font-semibold">
              Nama Kendaraan
            </label>

            <input
              {...register("name", {
                required: "Nama kendaraan wajib diisi",
              })}
              type="text"
              placeholder="Contoh: Avanza"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">
              Merek
            </label>

            <input
              {...register("brand")}
              type="text"
              placeholder="Contoh: Toyota"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">
              Nomor Plat
            </label>

            <input
              {...register("plateNumber", {
                required: "Nomor plat wajib diisi",
              })}
              type="text"
              placeholder="Contoh: B 1234 ABC"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">
              Transmisi
            </label>

            <select
              {...register("transmission", {
                required: "Transmisi wajib dipilih",
              })}
              className="w-full rounded border p-2"
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

          <div>
            <label className="mb-1 block font-semibold">
              Kategori
            </label>

            <select
              {...register("categoryId", {
                required: "Kategori wajib dipilih",
              })}
              className="w-full rounded border p-2"
            >
              <option value="">
                Pilih kategori
              </option>

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

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isSubmitting
                ? "Menyimpan..."
                : "Tambah Kendaraan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}