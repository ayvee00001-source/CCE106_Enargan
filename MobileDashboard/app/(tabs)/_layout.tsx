import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a1a3a',
          borderTopColor: 'rgba(255,255,255,0.1)',
          height: 60,
        },
        tabBarActiveTintColor: '#4fc3f7',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />
        }} 
      />
    </Tabs>
  );
}
