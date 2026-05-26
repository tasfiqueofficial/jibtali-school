export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Total Students</p>
          <p className="text-3xl font-bold text-green-900">450</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Total Teachers</p>
          <p className="text-3xl font-bold text-green-900">18</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Total Classes</p>
          <p className="text-3xl font-bold text-green-900">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Revenue (Monthly)</p>
          <p className="text-3xl font-bold text-green-900">৳ 1.2M</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Notices</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start border-b pb-4 last:border-0">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-bold whitespace-nowrap">
                  20 MAY
                </div>
                <div>
                  <p className="font-medium text-gray-900">Midterm Exam Schedule Released</p>
                  <p className="text-sm text-gray-500">All students are requested to check the schedule...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Attendance</h3>
          <div className="space-y-4">
             <p className="text-gray-500 italic">Attendance chart will be implemented here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
