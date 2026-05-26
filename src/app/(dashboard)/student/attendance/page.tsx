import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export default async function StudentAttendancePage() {
  const session = await auth();
  const userId = session?.user?.id;

  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      attendances: {
        orderBy: { date: "desc" },
      },
    },
  });

  if (!student) return <div>Data not found.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Attendance Records</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {student.attendances.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            ) : (
              student.attendances.map((att) => (
                <tr key={att.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(att.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      att.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {att.status ? "PRESENT" : "ABSENT"}
                    </span>
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
