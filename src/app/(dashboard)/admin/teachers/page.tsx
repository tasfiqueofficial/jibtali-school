import prisma from "@/lib/prisma";

export default async function AdminTeachersPage() {
  const teachers = await prisma.teacher.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Teacher Management</h1>
        <Link href="/admin/teachers/new" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          Add New Teacher
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Designation</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Phone</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No teachers found. Click "Add New Teacher" to get started.
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{teacher.user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{teacher.designation}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{teacher.user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{teacher.phone || "N/A"}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
