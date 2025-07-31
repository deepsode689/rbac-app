'use client';

import PermissionForm from '../components/Permissions/PermissionForm';
import PermissionList from '../components/Permissions/PermisssionList';
import RoleForm from '../components/Roles/RoleForm';
import RoleList from '../components/Roles/RoleList';
import RolePermissionManager from '../components/RolePermissionManager';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">RBAC Configuration Tool</h1>
          <p className="text-lg text-gray-600 mt-2">Manage roles and permissions easily.</p>
        </div>

        {/* Roles Section */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-semibold">Roles</h2>
          <RoleForm />
          <RoleList />
        </div>

        {/* Permissions Section */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-semibold">Permissions</h2>
          <PermissionForm />
          <PermissionList />
        </div>

        {/* Assign Permissions Section */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-semibold">Assign Permissions to Role</h2>
          <RolePermissionManager />
        </div>
      </div>
    </main>
  );
}
