import Link from "next/link";

import prisma from "@/lib/prisma";

export default async function AdminStudentsPage() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
      class: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
        <Link href="/admin/students/new" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          Add New Student
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Roll No</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Class</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No students found. Click "Add New Student" to get started.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">{student.rollNo}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.class.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.user.email}</td>
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
