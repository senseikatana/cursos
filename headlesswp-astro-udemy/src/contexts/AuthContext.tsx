import { createContext, useContext, type ReactNode } from 'react';
import { signIn as baSignIn, signUp as baSignUp, signOut as baSignOut, useSession } from '../lib/auth-client';

export type User = {
  id: string;
  email: string;
  name: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: sessionData, isPending: loading } = useSession();
  const user = sessionData?.user as unknown as User | null;

  const signIn = async (email: string, password: string) => {
    return new Promise<{ error?: string }>((resolve) => {
      baSignIn.email({
        email,
        password,
      }, {
        onSuccess: () => resolve({}),
        onError: (ctx) => resolve({ error: ctx.error.message || 'Error al iniciar sesión' })
      });
    });
  };

  const signUp = async (email: string, password: string) => {
    return new Promise<{ error?: string }>((resolve) => {
      baSignUp.email({
        email,
        password,
        name: email.split('@')[0],
      }, {
        onSuccess: () => resolve({}),
        onError: (ctx) => resolve({ error: ctx.error.message || 'Error al crear la cuenta' })
      });
    });
  };

  const signOut = async () => {
    await baSignOut();
  };

  const resetPassword = async (_email: string) => {
    // Implement forgot password if needed later, better-auth has a different flow.
    console.warn("Reset password not implemented with Better Auth yet");
  };

  return (
    <AuthContext.Provider value={{ user: user || null, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
