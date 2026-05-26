import Link from 'next/link';
import { auth } from '@/auth';

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
            JN
          </div>
          <span className="font-bold text-xl text-green-900 hidden sm:block">
            Jibtali Bidyaloy
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-gray-600 hover:text-green-600 font-medium">About</Link>
          <Link href="/notice" className="text-gray-600 hover:text-green-600 font-medium">Notice</Link>
          <Link href="/admission" className="text-gray-600 hover:text-green-600 font-medium">Admission</Link>
          {session ? (
            <Link 
              href={
                session.user.role === 'ADMIN' ? '/admin' : 
                session.user.role === 'TEACHER' ? '/teacher' : '/student'
              } 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Dashboard
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
