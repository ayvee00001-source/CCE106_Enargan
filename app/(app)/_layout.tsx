import { Tabs, router } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AppLayout() {
  const { token, authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !token) {
      router.replace('/sign-in');
    }
  }, [token, authLoading]);

  if (authLoading || !token) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#245bb2',
        headerTintColor: '#17324d',
        tabBarIconStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />

      <Tabs.Screen
        name="students"
        options={{ title: 'Students' }}
      />

      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile' }}
      />
    </Tabs>
  );
}
