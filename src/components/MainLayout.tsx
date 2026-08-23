import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 p-6 text-white">
        <h1 className="mb-8 text-xl font-bold">
          Rent Car Marifa
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
      </aside>

      <main className="ml-64 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  );
}