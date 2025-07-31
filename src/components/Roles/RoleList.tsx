'use client';

import { useEffect, useState } from 'react';
import {supabase }from '../../lib/supabaseClient';

export default function RoleList() {
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const { data, error } = await supabase.from('roles').select('*');
    if (!error) setRoles(data || []);
  };

  const deleteRole = async (id: number) => {
    await supabase.from('roles').delete().eq('id', id);
    fetchRoles();
  };

  return (
    <ul>
      {roles.map((role) => (
        <li key={role.id} style={{ marginBottom: '0.5rem' }}>
          {role.name}
          <button
            onClick={() => deleteRole(role.id)}
            style={{
              marginLeft: '0.75rem',
              backgroundColor: '#e63946',
              color: '#fff',
              border: 'none',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
