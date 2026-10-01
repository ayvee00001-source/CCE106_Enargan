import { createContext, useEffect, useState, type ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { API_BASE_URL } from '@/constants/api';

export type User = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (accessToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

const TOKEN_KEY = 'student_service_access_token';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = async (accessToken: string, userData: User) => {
    if (Platform.OS === 'web') {
      setToken(accessToken);
      setUser(userData);
      return;
    }

    try {
      await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      setToken(accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Failed to save authentication token:', error);
      throw new Error('Unable to save your session. Please try again.');
    }
  };

  const logout = async () => {
    try {
      if (Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }

      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Failed to clear authentication token:', error);

      // Clear in-memory authentication even if secure storage fails.
      setToken(null);
      setUser(null);

      throw new Error('Unable to clear the saved session.');
    }
  };

  const restoreSession = async () => {
    setAuthLoading(true);

    try {
      if (Platform.OS === 'web') {
        setToken(null);
        setUser(null);
        return;
      }

      const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);

      if (!savedToken) {
        setToken(null);
        setUser(null);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      if (response.status === 401) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setToken(null);
        setUser(null);
        return;
      }

      if (!response.ok) {
        throw new Error(`Profile request failed with status ${response.status}.`);
      }

      const data = await response.json();

      setToken(savedToken);
      setUser(data.user ?? data.profile ?? data);
    } catch (error) {
      console.error('Failed to restore session:', error);
      setToken(null);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authLoading,
        login,
        logout,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
