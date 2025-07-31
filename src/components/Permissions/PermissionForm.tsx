'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function PermissionForm() {
  const [permission, setPermission] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!permission) return;

    const { error } = await supabase.from('permissions').insert({ name: permission });
    if (error) console.error('Insert error:', error);
    else setPermission('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter permission name"
        value={permission}
        onChange={(e) => setPermission(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
