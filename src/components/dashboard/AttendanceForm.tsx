"use client";

import { useState } from "react";
import { markAttendance } from "@/lib/actions";

interface Student {
  id: string;
  rollNo: string;
  user: {
    name: string | null;
  };
}

export default function AttendanceForm({ 
  students, 
  classId 
}: { 
  students: Student[], 
  classId: string 
}) {
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    students.reduce((acc, student) => ({ ...acc, [student.id]: true }), {})
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleToggle = (studentId: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = Object.entries(attendance).map(([studentId, status]) => ({
      studentId,
      status,
    }));

    const result = await markAttendance(classId, data);
    if (result.success) {
      setMessage("Attendance marked successfully!");
    } else {
      setMessage("Error marking attendance.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-gray-50">
        <h3 className="font-bold text-gray-800">Student List</h3>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || students.length === 0}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Attendance"}
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
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-800 font-mono">{student.rollNo}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.user.name}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => handleToggle(student.id)}
                  className={`w-20 py-1 rounded-full text-xs font-bold transition ${
                    attendance[student.id] 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {attendance[student.id] ? "PRESENT" : "ABSENT"}
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                No students found for this class.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
