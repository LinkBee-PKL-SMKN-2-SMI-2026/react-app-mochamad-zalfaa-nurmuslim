import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function MainLayout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-gray-900 p-6 text-white">
        <h1 className="mb-8 text-xl font-bold">
          Rent Car Mariza
        </h1>

        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/vehicles"
                className="block rounded px-3 py-2 hover:bg-gray-800"
              >
                Katalog Kendaraan
              </Link>
            </li>

            <li>
              <Link
                to="/vehicles/new"
                className="block rounded px-3 py-2 hover:bg-gray-800"
              >
                Tambah Kendaraan
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-auto w-full rounded bg-red-500 px-3 py-2 text-left font-semibold hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      <main className="ml-64 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  );
}