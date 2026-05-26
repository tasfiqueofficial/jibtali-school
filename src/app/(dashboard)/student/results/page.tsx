import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export default async function StudentResultsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      results: {
        include: { subject: true },
        orderBy: { examType: "desc" },
      },
    },
  });

  if (!student) return <div>Data not found.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Academic Results</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Subject</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Exam Type</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Marks</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {student.results.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No results published yet.
                </td>
              </tr>
            ) : (
              student.results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{result.subject.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{result.examType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{result.marks}</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">{result.grade}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
