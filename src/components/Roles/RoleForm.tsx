'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function RoleForm() {
  const [role, setRole] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('roles').insert({ name: role });
    if (error) console.error(error);
    else setRole('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role name"
      />
      <button type="submit">Add Role</button>
    </form>
  );
}
