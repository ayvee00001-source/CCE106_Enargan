import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#2563eb',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#1E293B'
};

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: { backgroundColor: COLORS.card, borderTopWidth: 0 },
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff'
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({color, size}) => <Ionicons name="person" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: 'Settings',
          tabBarIcon: ({color, size}) => <Ionicons name="settings" size={size} color={color} />
        }} 
      />
    </Tabs>
  );
}
