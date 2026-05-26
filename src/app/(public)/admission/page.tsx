export default function AdmissionPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-4 text-center">Online Admission Form</h1>
        <p className="text-gray-600 mb-12 text-center">
          Please fill out the form below to apply for admission. Our team will contact you soon.
        </p>

        <form className="bg-white p-8 rounded-xl shadow-md border space-y-8">
          {/* Student Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">Student Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (English)</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পূর্ণ নাম (বাংলা)</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" placeholder="জন ডো" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Applied For</label>
                <select className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500">
                  <option>Class 6</option>
                  <option>Class 7</option>
                  <option>Class 8</option>
                </select>
              </div>
            </div>
          </div>

          {/* Parental Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">Parental Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
