export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Jibtali Nimno Madhyamik Bidyaloy</h3>
            <p className="text-gray-400">
              Dedicated to providing quality education and fostering excellence since 1995.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/admission" className="hover:text-white transition">Online Admission</a></li>
              <li><a href="/notice" className="hover:text-white transition">Notice Board</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Jibtali, Rangamati Hill District</p>
            <p className="text-gray-400">Email: info@jibtalischool.edu.bd</p>
            <p className="text-gray-400">Phone: +880 1XXX-XXXXXX</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Jibtali Nimno Madhyamik Bidyaloy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
