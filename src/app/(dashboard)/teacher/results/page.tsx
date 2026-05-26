import prisma from "@/lib/prisma";
import ResultForm from "@/components/dashboard/ResultForm";

export default async function TeacherResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ classId?: string; subjectId?: string; examType?: string }>;
}) {
  const params = await searchParams;
  const classes = await prisma.class.findMany();
  const selectedClassId = params.classId || "";
  const selectedSubjectId = params.subjectId || "";
  const selectedExamType = params.examType || "Midterm";

  const subjects = selectedClassId 
    ? await prisma.subject.findMany({ where: { classId: selectedClassId } })
    : [];

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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Result Entry</h1>
        <p className="text-gray-500 text-sm">Select class, subject and exam type to enter marks.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select 
              name="classId" 
              defaultValue={selectedClassId}
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select 
              name="subjectId" 
              defaultValue={selectedSubjectId}
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
            <select 
              name="examType" 
              defaultValue={selectedExamType}
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Midterm">Midterm</option>
              <option value="Final">Final</option>
              <option value="Class Test">Class Test</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-8 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
          >
            Load Form
          </button>
        </form>
      </div>

      {selectedClassId && selectedSubjectId && (
        <ResultForm 
          students={students} 
          subjectId={selectedSubjectId} 
          examType={selectedExamType} 
        />
      )}
    </div>
  );
}
