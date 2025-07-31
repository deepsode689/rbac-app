'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type Role = {
  id: string;
  name: string;
};

type Permission = {
  id: string;
  name: string;
};

export default function RolePermissionManager() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    loadRolesAndPermissions();
  }, []);

  const loadRolesAndPermissions = async () => {
    const { data: roleData, error: roleError } = await supabase.from('roles').select('*');
    const { data: permissionData, error: permError } = await supabase.from('permissions').select('*');

    if (roleError) console.error('Role fetch error:', roleError);
    else setRoles(roleData || []);

    if (permError) console.error('Permission fetch error:', permError);
    else setPermissions(permissionData || []);
  };

  const handleAssign = async () => {
    if (!selectedRole || selectedPermissions.length === 0) {
      alert('Select a role and at least one permission');
      return;
    }

    const inserts = selectedPermissions.map((permId) => ({
      role_id: selectedRole,
      permission_id: permId,
    }));

    const { error } = await supabase.from('role_permissions').insert(inserts);
    if (error) {
      console.error('Assign error:', error);
    } else {
      alert('Permissions assigned!');
      setSelectedPermissions([]);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Assign Permissions to Role</h3>

      <select
        onChange={(e) => setSelectedRole(e.target.value)}
        value={selectedRole}
        style={{ marginBottom: '1rem' }}
      >
        <option value="">Select Role</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>

      <div style={{ marginBottom: '1rem' }}>
        {permissions.map((perm) => (
          <label key={perm.id} style={{ display: 'block' }}>
            <input
              type="checkbox"
              value={perm.id}
              checked={selectedPermissions.includes(perm.id)}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectedPermissions((prev) =>
                  checked ? [...prev, perm.id] : prev.filter((id) => id !== perm.id)
                );
              }}
            />
            {perm.name}
          </label>
        ))}
      </div>

      <button onClick={handleAssign}>Assign Permissions</button>
    </div>
  );
}
