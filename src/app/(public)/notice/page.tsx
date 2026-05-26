import prisma from "@/lib/prisma";

export default async function PublicNoticePage() {
  const notices = await prisma.notice.findMany({
    include: { class: true },
    orderBy: { date: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-4 text-center">Notice Board</h1>
        <p className="text-gray-600 mb-12 text-center">
          Stay updated with the latest news, announcements, and academic updates from Jibtali Nimno Madhyamik Bidyaloy.
        </p>

        <div className="space-y-6">
          {notices.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-sm border text-center">
              <p className="text-gray-500">No active notices at the moment. Please check back later.</p>
            </div>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className="bg-white p-8 rounded-xl shadow-sm border hover:border-green-300 transition group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition">
                    {notice.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {new Date(notice.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    {notice.class && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                        {notice.class.name}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {notice.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
