import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center py-60">
      <main className="flex flex-col items-center gap-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={80}
          height={38}
          priority
        />
        
        <h1 className="text-4xl font-bold text-gray-700">
          Welcome to NextAuth
        </h1>
        
        <div className="flex gap-4 mt-6">
          <Link
            href="/login"
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </Link>
          
          <Link
            href="/signup"
            className="rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Sign Up
          </Link>
        </div>
      </main>

      <footer className="fixed bottom-8 flex gap-6 text-sm text-gray-600">
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900"
        >
          Docs
        </a>
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}