'use client'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600">
            Made with ❤️ for Italian learners
          </p>
          <p className="text-sm text-gray-500 mt-2">
            &copy; {new Date().getFullYear()} Learn Italian. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

