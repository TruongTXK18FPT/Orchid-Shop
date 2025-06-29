// Role-based permission utilities

export const UserRole = {
  SUPERADMIN: 1,
  ADMIN: 2,
  CUSTOMER: 3
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

export interface UserPermissions {
  canEditRoles: boolean;
  canManageAccounts: boolean;
  canManageOrchids: boolean;
  canManageOrders: boolean;
  canDeleteAccounts: boolean;
}

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    const user = JSON.parse(userStr);
    return user;
  } catch {
    return null;
  }
};

// Get current user's role ID
export const getCurrentUserRoleId = (): number | null => {
  const user = getCurrentUser();
  return user?.roleId ?? null;
};

// Check if current user is superadmin
export const isSuperAdmin = (): boolean => {
  const roleId = getCurrentUserRoleId();
  return roleId === UserRole.SUPERADMIN;
};

// Check if current user is admin or higher
export const isAdminOrHigher = (): boolean => {
  const roleId = getCurrentUserRoleId();
  return roleId === UserRole.SUPERADMIN || roleId === UserRole.ADMIN;
};

// Get user permissions based on role
export const getUserPermissions = (): UserPermissions => {
  const roleId = getCurrentUserRoleId();
  
  switch (roleId) {
    case UserRole.SUPERADMIN:
      return {
        canEditRoles: true,
        canManageAccounts: true,
        canManageOrchids: true,
        canManageOrders: true,
        canDeleteAccounts: true
      };
    
    case UserRole.ADMIN:
      return {
        canEditRoles: false, // Admin cannot edit roles
        canManageAccounts: true,
        canManageOrchids: true,
        canManageOrders: true,
        canDeleteAccounts: false // Only superadmin can delete accounts
      };
    
    case UserRole.CUSTOMER:
    default:
      return {
        canEditRoles: false,
        canManageAccounts: false,
        canManageOrchids: false,
        canManageOrders: false,
        canDeleteAccounts: false
      };
  }
};

// Check if user can edit another user's role
export const canEditUserRole = (): boolean => {
  const currentUserRoleId = getCurrentUserRoleId();
  
  // Only superadmin can edit roles
  return currentUserRoleId === UserRole.SUPERADMIN;
};

// Check if user can delete another user
export const canDeleteUser = (targetUserRoleId: number): boolean => {
  const currentUserRoleId = getCurrentUserRoleId();
  
  // Only superadmin can delete accounts
  if (currentUserRoleId !== UserRole.SUPERADMIN) {
    return false;
  }
  
  // Superadmin can delete any account except other superadmins
  return targetUserRoleId !== UserRole.SUPERADMIN;
};

// Check if user can edit another user's account
export const canEditUser = (targetUserRoleId: number): boolean => {
  const currentUserRoleId = getCurrentUserRoleId();
  
  // Superadmin can edit anyone
  if (currentUserRoleId === UserRole.SUPERADMIN) {
    return true;
  }
  
  // Admin cannot edit superadmin accounts
  if (currentUserRoleId === UserRole.ADMIN && targetUserRoleId === UserRole.SUPERADMIN) {
    return false;
  }
  
  // Admin can edit other admin and customer accounts
  if (currentUserRoleId === UserRole.ADMIN) {
    return targetUserRoleId === UserRole.ADMIN || targetUserRoleId === UserRole.CUSTOMER;
  }
  
  // Customers cannot edit any accounts
  return false;
};

// Get role name by ID
export const getRoleName = (roleId: number): string => {
  switch (roleId) {
    case UserRole.SUPERADMIN:
      return 'Super Admin';
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.CUSTOMER:
      return 'Customer';
    default:
      return 'Unknown';
  }
};

// Get available roles for selection based on current user's role
export const getAvailableRoles = (): Array<{ id: number; name: string }> => {
  const currentUserRoleId = getCurrentUserRoleId();
  
  if (currentUserRoleId === UserRole.SUPERADMIN) {
    // Superadmin can assign any role
    return [
      { id: UserRole.SUPERADMIN, name: 'Super Admin' },
      { id: UserRole.ADMIN, name: 'Admin' },
      { id: UserRole.CUSTOMER, name: 'Customer' }
    ];
  }
  
  // Admin and others cannot assign roles
  return [];
};
