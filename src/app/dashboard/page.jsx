'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
        setLoading(false);
      }
    }

    fetchUsers();
    console.log(fetchUsers);
    
  }, [router]);

  if (loading) return <div className="p-6">Loading users...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      {users.map((user) => console.log(user.name))}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{users[1]?.name}'s List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 tracking-wider">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 tracking-wider">Phone</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (   
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index+1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
