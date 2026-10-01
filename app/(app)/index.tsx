import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardScreen() {
  const { user, token } = useAuth();

  const displayName = user?.name || user?.email || 'Student';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>STUDENT SERVICE PORTAL</Text>

      <Text style={styles.title}>Welcome, {displayName}</Text>

      <Text style={styles.subtitle}>
        Your student services in one place.
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Quick Actions</Text>

        <Link href="/(app)/students" asChild>
          <Pressable
            accessibilityRole="button"
            style={styles.button}
          >
            <Text style={styles.buttonText}>View Students</Text>
          </Pressable>
        </Link>

        <Link href="/(app)/profile" asChild>
          <Pressable
            accessibilityRole="button"
            style={styles.button}
          >
            <Text style={styles.buttonText}>My Profile</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Account Information</Text>

        <Text style={styles.info}>
          Name: {user?.name || '—'}
        </Text>

        <Text style={styles.info}>
          Email: {user?.email || '—'}
        </Text>

        <Text style={styles.info}>
          Role: {user?.role || '—'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Session Status</Text>

        <Text style={styles.subtitle}>
          {token ? 'Authenticated' : 'Not Available'}
        </Text>
      </View>

      <Text style={styles.note}>
        You are signed in to the Student Service Portal.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 16,
    backgroundColor: '#f2f5fa',
  },
  eyebrow: {
    color: '#245bb2',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#17324d',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#536579',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    gap: 14,
  },
  heading: {
    color: '#17324d',
    fontSize: 18,
    fontWeight: '600',
  },
  info: {
    color: '#536579',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#245bb2',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  note: {
    color: '#536579',
    fontSize: 12,
  },
});
