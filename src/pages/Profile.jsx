import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('users').select('*').eq('id', user.id).single();
        if (error) {
          console.error('Error fetching user:', error);
        } else {
          setUser(data);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please log in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-md">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{user.full_name.charAt(0)}</span>
            </div>
            <h1 className="text-2xl font-bold">{user.full_name}</h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold">Phone</label>
              <p className="text-gray-600">{user.phone}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <p className="text-gray-600">{user.email || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Role</label>
              <p className="text-gray-600">{user.role}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Created At</label>
              <p className="text-gray-600">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;