import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { theme } from '../theme';

export default function RootLayout() {
  const scheme = useColorScheme();
  const currentTheme = scheme === 'dark'? theme.dark : theme.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentTheme.primary,
        tabBarInactiveTintColor: currentTheme.subtext,
        tabBarStyle: {
          backgroundColor: currentTheme.card,
          borderTopColor: currentTheme.border,
          height: 60,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: currentTheme.card,
        },
        headerTintColor: currentTheme.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="task/[id]"
        options={{ href: null }} // itatago sa tab bar
      />
    </Tabs>
  );
}
