import prisma from "@/lib/prisma";
import AttendanceForm from "@/components/dashboard/AttendanceForm";

export default async function TeacherAttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ classId?: string }>;
}) {
  const params = await searchParams;
  const classes = await prisma.class.findMany();
  const selectedClassId = params.classId || "";

  const students = selectedClassId 
    ? await prisma.student.findMany({
        where: { classId: selectedClassId },
        include: { user: true },
        orderBy: { rollNo: "asc" },
      })
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Daily Attendance Marking</h1>
        <p className="text-gray-500 text-sm">Select a class to mark attendance for today ({new Date().toLocaleDateString()}).</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
            <select 
              name="classId" 
              defaultValue={selectedClassId}
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a class...</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-8 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
          >
            Load Students
          </button>
        </form>
      </div>

      {selectedClassId && (
        <AttendanceForm students={students} classId={selectedClassId} />
      )}
    </div>
  );
}
