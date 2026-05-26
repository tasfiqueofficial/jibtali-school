export default function TeacherPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Assigned Classes</p>
          <p className="text-3xl font-bold text-blue-900">2</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Total Students</p>
          <p className="text-3xl font-bold text-blue-900">85</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Attendance marked today</p>
          <p className="text-3xl font-bold text-green-600">Yes</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Class Schedule (Today)</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-bold text-gray-900">Class 8 - Mathematics</p>
              <p className="text-sm text-gray-500">10:00 AM - 11:00 AM</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              Completed
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-bold text-gray-900">Class 9 - Higher Math</p>
              <p className="text-sm text-gray-500">12:30 PM - 01:30 PM</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
              Upcoming
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
