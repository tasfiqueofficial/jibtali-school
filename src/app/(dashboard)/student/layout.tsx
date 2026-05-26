import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-800">
          Student Portal
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link href="/student" className="block px-4 py-2 rounded hover:bg-indigo-800 transition">
            My Dashboard
          </Link>
          <Link href="/student/results" className="block px-4 py-2 rounded hover:bg-indigo-800 transition">
            My Results
          </Link>
          <Link href="/student/attendance" className="block px-4 py-2 rounded hover:bg-indigo-800 transition">
            My Attendance
          </Link>
          <Link href="/student/routine" className="block px-4 py-2 rounded hover:bg-indigo-800 transition">
            Class Routine
          </Link>
        </nav>
        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center">
              {session?.user?.name?.[0] || "S"}
            </div>
            <div className="text-sm font-medium truncate">
              {session?.user?.name || "Student"}
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
          <h2 className="text-xl font-semibold text-gray-800">Academic Overview</h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
