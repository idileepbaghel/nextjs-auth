'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../component/layout';

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchUsers() {
      const startTime = Date.now();
      try {
        const res = await fetch('/api/items', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
        } else {
          setError(data.error || 'Failed to fetch users');
        }
      } catch (err) {
        console.error(err);
        setError('Server error');
      } finally {
        const elapsed = Date.now() - startTime;
        const minDuration = 500; // ms
        const remaining = minDuration - elapsed;

        setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
      }
    }

    fetchUsers();
    // console.log(fetchUsers);
    
  }, [router]);

  if (loading) return <div className="p-6">Loading users...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <DashboardLayout>
      <div className="p-3 bg-gray-200 rounded-lg mb-6">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    
    {/* Total Subscribers */}
    <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-slate-300 bg-opacity-50 p-3 rounded-lg text-black">
          {/* Icon: Users */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" 
              d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Subscribers</p>
          <p className="text-2xl font-bold text-gray-900">71,897 <span className="text-green-500 text-sm font-medium">↑ 122</span></p>
        </div>
      </div>
      <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">View all</a>
    </div>

    {/* Avg. Open Rate */}
    <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-sky-300 p-3 rounded-lg text-black">
          {/* Icon: Mail */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 8V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Avg. Open Rate</p>
          <p className="text-2xl font-bold text-gray-900">58.16% <span className="text-green-500 text-sm font-medium">↑ 5.4%</span></p>
        </div>
      </div>
      <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">View all</a>
    </div>

    {/* Avg. Click Rate */}
    <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-emerald-300 p-3 rounded-lg text-black">
          {/* Icon: Click */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" 
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" 
              d="M13 16h-1v-4h-1m-2 0h.01M16 12h.01M4 6h16M4 18h16" />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Avg. Click Rate</p>
          <p className="text-2xl font-bold text-gray-900">24.57% <span className="text-red-500 text-sm font-medium">↓ 3.2%</span></p>
        </div>
      </div>
      <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">View all</a>
    </div>

  </div>
</div>

      {users.map((user) => console.log(user.name))}
      <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {users[1]?.name}'s List
      </h1>

      {/* Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-100 rounded-lg bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">S.No</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="bg-white border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-900 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone || "N/A"}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium" style={{ cursor: 'pointer' }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </DashboardLayout>
  );
}
