import prisma from "@/lib/prisma";
import { createNotice } from "@/lib/actions";

export default async function AdminNoticesPage() {
  const notices = await prisma.notice.findMany({
    include: { class: true },
    orderBy: { date: "desc" },
  });

  const classes = await prisma.class.findMany();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Notice Board Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Notice Form */}
        <div className="lg:col-span-1">
          <form action={createNotice} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Post New Notice</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                name="title" 
                type="text" 
                required 
                className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" 
                placeholder="Notice title" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea 
                name="content" 
                required 
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" 
                placeholder="Detailed information..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Class (Optional)</label>
              <select 
                name="classId" 
                className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition"
            >
              Post Notice
            </button>
          </form>
        </div>

        {/* Notice List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Existing Notices</h2>
          {notices.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border text-center text-gray-500">
              No notices posted yet.
            </div>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{notice.title}</h3>
                  <span className="text-xs text-gray-400">
                    {new Date(notice.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{notice.content}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    {notice.class?.name || "All Students"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
