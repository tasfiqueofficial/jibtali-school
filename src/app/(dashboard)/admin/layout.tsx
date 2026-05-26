import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-800">
          Jibtali School
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-green-800 transition">
            Dashboard
          </Link>
          <Link href="/admin/students" className="block px-4 py-2 rounded hover:bg-green-800 transition">
            Students
          </Link>
          <Link href="/admin/teachers" className="block px-4 py-2 rounded hover:bg-green-800 transition">
            Teachers
          </Link>
          <Link href="/admin/classes" className="block px-4 py-2 rounded hover:bg-green-800 transition">
            Classes
          </Link>
          <Link href="/admin/notices" className="block px-4 py-2 rounded hover:bg-green-800 transition">
            Notices
          </Link>
        </nav>
        <div className="p-4 border-t border-green-800">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
              {session?.user?.name?.[0] || "A"}
            </div>
            <div className="text-sm font-medium truncate">
              {session?.user?.name || "Admin"}
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="w-full text-left px-4 py-2 rounded hover:bg-red-800 transition text-red-200">
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="bg-white border-b h-16 flex items-center px-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Admin Portal</h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
