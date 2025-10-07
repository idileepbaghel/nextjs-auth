'use client';
import "../globals.css";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { GiMedicines } from "react-icons/gi";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
      <>
        {/* Navbar */}
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-300 shadow-sm">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                {/* Sidebar toggle button (mobile) */}
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    />
                  </svg>
                </button>

                {/* Logo */}
                <a href="#" className="flex ms-2 md:me-24 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40">
                    <rect x="0" y="0" width="100" height="100" fill="#FFFFFF" />

                    <path d="M20,35 L30,35 L35,65 L70,65 L75,40 L35,40" fill="#888888" stroke="none" />
                    <circle cx="40" cy="70" r="5" fill="#888888" />
                    <circle cx="65" cy="70" r="5" fill="#888888" />
                    <path d="M40,30 L50,30 L50,20 L40,20 Z" fill="#888888" />
                    <path d="M30,30 L35,30 L35,20 L30,20 Z" fill="#888888" />
                    <path d="M25,25 L25,40 L30,40 L30,25 Z" fill="#888888" />

                    <text
                      x="75"
                      y="45"
                      fontFamily="Arial, sans-serif"
                      fontSize="10"
                      fill="#888888"
                      fontWeight="bold"
                    >
                      E
                    </text>

                    <path d="M60,40 L60,55 L70,55 L70,40 Z" fill="#888888" />
                    <path d="M75,40 L75,50 L80,50 L80,40 Z" fill="#888888" />
                  </svg>
                  <span className="self-center text-lg font-semibold sm:text-2xl whitespace-nowrap text-gray-700">
                    My App
                  </span>
                </a>
              </div>

              {/* Right side (logout button) */}
              <div className="flex items-center">
                <div className="relative flex items-center ms-3 group">
                  <button
                    onClick={handleLogout}
                    className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                  >
                    <TbLogout2 className="inline-block me-2" />
                  </button>

                  {/* Tooltip */}
                  <div className="absolute top-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                  bg-gray-800 text-white text-sm rounded-md px-3 py-1 whitespace-nowrap 
                                  pointer-events-none transition-opacity duration-300">
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-300 sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/dashboard"
                  className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
                >
                  <FaHome className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700" />
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              {/* Add more links here */}
            </ul>
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/medicine"
                  className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
                >
                  <GiMedicines className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-700" />
                  <span className="ms-3">Medicines</span>
                </a>
              </li>
              {/* Add more links here */}
            </ul>
          </div>
        </aside>

        {/* Page content wrapper */}
        <div className="p-4 sm:ml-64">
          <div className="p-4 rounded-lg border border-gray-200 mt-14 bg-white text-gray-700">
            {children}
          </div>
        </div>
      </>
  );
}
