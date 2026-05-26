import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export default async function StudentPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      class: true,
      attendances: {
        orderBy: { date: "desc" },
        take: 10,
      },
      results: {
        include: { subject: true },
        orderBy: { examType: "desc" },
      },
    },
  });

  if (!student) return <div>Student data not found.</div>;

  const attendanceRate = student.attendances.length > 0
    ? (student.attendances.filter(a => a.status).length / student.attendances.length * 100).toFixed(1)
    : "N/A";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Class</p>
          <p className="text-3xl font-bold text-indigo-900">{student.class.name}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Recent Attendance Rate</p>
          <p className="text-3xl font-bold text-indigo-900">{attendanceRate}%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Roll Number</p>
          <p className="text-3xl font-bold text-green-600">{student.rollNo}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Academic Results</h3>
          <div className="space-y-4">
            {student.results.length === 0 ? (
              <p className="text-gray-500 italic">No results published yet.</p>
            ) : (
              student.results.map((result) => (
                <div key={result.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-gray-900 font-medium">{result.subject.name}</span>
                    <span className="ml-2 text-xs text-gray-400">({result.examType})</span>
                  </div>
                  <span className={`font-bold ${result.grade === 'F' ? 'text-red-600' : 'text-green-600'}`}>
                    {result.grade} ({result.marks})
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Attendance</h3>
          <div className="space-y-2">
            {student.attendances.length === 0 ? (
              <p className="text-gray-500 italic">No attendance records found.</p>
            ) : (
              student.attendances.map((att) => (
                <div key={att.id} className="flex justify-between items-center text-sm border-b pb-1">
                  <span className="text-gray-600">{new Date(att.date).toLocaleDateString()}</span>
                  <span className={att.status ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {att.status ? "PRESENT" : "ABSENT"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
