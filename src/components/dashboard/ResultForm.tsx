"use client";

import { useState } from "react";
import { createResults } from "@/lib/actions";

interface Student {
  id: string;
  rollNo: string;
  user: {
    name: string | null;
  };
}

export default function ResultForm({ 
  students, 
  subjectId,
  examType 
}: { 
  students: Student[], 
  subjectId: string,
  examType: string
}) {
  const [marks, setMarks] = useState<Record<string, number>>(
    students.reduce((acc, student) => ({ ...acc, [student.id]: 0 }), {})
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleMarkChange = (studentId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMarks(prev => ({ ...prev, [studentId]: numValue }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = Object.entries(marks).map(([studentId, marks]) => ({
      studentId,
      marks,
    }));

    const result = await createResults(subjectId, examType, data);
    if (result.success) {
      setMessage("Results saved successfully!");
    } else {
      setMessage("Error saving results.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-gray-50">
        <h3 className="font-bold text-gray-800">Enter Marks for {examType}</h3>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || students.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Results"}
        </button>
      </div>
      
      {message && (
        <div className={`p-4 text-center text-sm font-medium ${message.includes("Error") ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50"}`}>
          {message}
        </div>
      )}

      <table className="w-full text-left">
        <thead className="bg-white border-b">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Roll No</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase w-32">Marks</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-800 font-mono">{student.rollNo}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.user.name}</td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={marks[student.id]}
                  onChange={(e) => handleMarkChange(student.id, e.target.value)}
                  className="w-20 px-2 py-1 border rounded focus:ring-blue-500 focus:border-blue-500 text-center font-bold"
                />
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
