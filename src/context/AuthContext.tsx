import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'volunteer' | 'ngo' | 'tech_team';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organizationName?: string;
  wilaya?: string;
}

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  volunteer: {
    id: 'vol-101',
    name: 'أمين بن علي',
    email: 'amine.benali@dz-youth.dz',
    role: 'volunteer',
    wilaya: 'الجزائر العاصمة',
  },
  ngo: {
    id: 'ngo-1',
    name: 'د. ابتسام حملاوي',
    email: 'direction@cra-alger.dz',
    role: 'ngo',
    organizationName: 'الهلال الأحمر الجزائري',
    wilaya: 'الجزائر العاصمة',
  },
  tech_team: {
    id: 'admin-01',
    name: 'المهندس زكرياء (فريق الإشراف التقني)',
    email: 'admin.tech@volunteernet.dz',
    role: 'tech_team',
    organizationName: 'المرصد الوطني للمجتمع المدني / الفريق التقني',
    wilaya: 'الإدارة المركزية',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'volunteernet_auth_role';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY) as UserRole;
    return saved && DEMO_PROFILES[saved] ? saved : 'volunteer';
  });

  const [user, setUser] = useState<UserProfile>(DEMO_PROFILES[role]);

  useEffect(() => {
    setUser(DEMO_PROFILES[role]);
    localStorage.setItem(AUTH_STORAGE_KEY, role);
  }, [role]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const login = (email: string, newRole: UserRole) => {
    setRoleState(newRole);
    setUser({
      ...DEMO_PROFILES[newRole],
      email,
    });
  };

  const logout = () => {
    setRoleState('volunteer');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        login,
        logout,
        isAuthenticated: true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
