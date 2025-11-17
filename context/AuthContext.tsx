// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, 
         createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  handleRegister: (email: string, pass: string) => Promise<any>;
  handleLogin: (email: string, pass: string) => Promise<any>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = (email: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const handleLogin = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const handleLogout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};