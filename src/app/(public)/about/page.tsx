export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">About Our School</h1>
        
        <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our History</h2>
            <p>
              Jibtali Nimno Madhyamik Bidyaloy was established in 1995 with the goal of providing quality secondary education to the children of the Jibtali region in Rangamati. Starting with only a handful of students, the school has grown into a cornerstone of the local community.
            </p>
          </section>

          <section className="bg-green-50 p-8 rounded-2xl border border-green-100">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Our Mission</h2>
            <p className="text-green-800">
              To empower students with knowledge, skills, and values that will enable them to become responsible citizens and lifelong learners. We strive to create a nurturing environment where every child can reach their full potential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Core Values</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
              <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <span>Academic Excellence</span>
              </li>
              <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <span>Moral Integrity</span>
              </li>
              <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <span>Community Service</span>
              </li>
              <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                <span>Respect & Inclusivity</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
