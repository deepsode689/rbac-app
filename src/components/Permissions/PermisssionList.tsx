'use client';

import { useEffect, useState } from 'react';
import {supabase }from '../../lib/supabaseClient';

export default function PermissionList() {
  const [permissions, setPermissions] = useState<any[]>([]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    const { data, error } = await supabase.from('permissions').select('*');
    if (!error) setPermissions(data || []);
  };

  const deletePermission = async (id: number) => {
    await supabase.from('permissions').delete().eq('id', id);
    fetchPermissions();
  };

  return (
    <ul>
      {permissions.map((perm) => (
        <li key={perm.id} style={{ marginBottom: '0.5rem' }}>
          {perm.name}
          <button
            onClick={() => deletePermission(perm.id)}
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
