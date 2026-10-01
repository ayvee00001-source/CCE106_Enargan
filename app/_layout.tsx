import { Stack, router, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';

function RootNavigator() {
  const { token, authLoading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const isSignIn = pathname === '/sign-in';
    const isProtectedRoute =
      pathname.startsWith('/student') ||
      pathname.startsWith('/(app)');

    if (!token && isProtectedRoute) {
      router.replace('/sign-in');
      return;
    }

    if (token && isSignIn) {
      router.replace('/(app)');
    }
  }, [token, authLoading, pathname]);

  if (authLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerTintColor: '#17324d' }}>
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="student/[id]" options={{ title: 'Student Details' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
