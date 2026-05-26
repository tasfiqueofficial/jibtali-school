import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-4">
            জীবতলী নিম্ন মাধ্যমিক বিদ্যালয়
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-8">
            Jibtali Nimno Madhyamik Bidyaloy
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Building a brighter future through excellence in education and moral values. 
            Located in the heart of Jibtali, providing quality education for generations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/admission" 
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              Online Admission
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-green-600">500+</p>
              <p className="text-gray-600">Students</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">20+</p>
              <p className="text-gray-600">Teachers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">100%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">1995</p>
              <p className="text-gray-600">Founded</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
