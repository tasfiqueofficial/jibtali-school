import { createTeacher } from "@/lib/actions";
import Link from "next/link";

export default function NewTeacherPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/teachers" className="text-gray-500 hover:text-green-600 transition">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Add New Teacher</h1>
      </div>

      <form action={createTeacher} className="bg-white p-8 rounded-xl shadow-sm border space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" 
              placeholder="Teacher's full name" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" 
              placeholder="teacher@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" 
              placeholder="Min 6 characters" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <input 
              name="designation" 
              type="text" 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" 
              placeholder="e.g. Assistant Teacher" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
            <input 
              name="phone" 
              type="tel" 
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500" 
              placeholder="01XXX-XXXXXX" 
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition"
          >
            Create Teacher Account
          </button>
        </div>
      </form>
    </div>
  );
}
