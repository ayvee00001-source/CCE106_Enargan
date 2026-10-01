import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { API_BASE_URL } from '@/constants/api';

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    if (!token) {
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        await logout();
        throw new Error('Your session has expired. Please sign in again.');
      }

      if (!response.ok) {
        throw new Error(`Failed to load profile (${response.status}).`);
      }

      const data = await response.json();
      const profileData = data?.user ?? data?.profile ?? data;

      if (!profileData || typeof profileData !== 'object') {
        throw new Error('Profile data was not returned by the server.');
      }

      setProfile(profileData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // The loader intentionally updates loading/data/error state after the API request.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator color="#245bb2" />
          <Text style={styles.text}>Loading profile…</Text>
        </View>
      ) : error ? (
        <View style={styles.card}>
          <Text style={styles.error} accessibilityLiveRegion="polite">
            {error}
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={loadProfile}
          >
            <Text style={styles.link}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.text}>
            Name: {profile?.name || '—'}
          </Text>

          <Text style={styles.text}>
            Email: {profile?.email || '—'}
          </Text>

          <Text style={styles.text}>
            Role: {profile?.role || '—'}
          </Text>
        </View>
      )}

      <Text style={styles.text}>
        Session Status: {token ? 'Authenticated' : 'Not Available'}
      </Text>

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={logout}
        disabled={loading}
      >
        <Text style={styles.buttonText}>LOGOUT</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 20,
    backgroundColor: '#f2f5fa',
  },
  title: {
    color: '#17324d',
    fontSize: 24,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 16,
    borderRadius: 12,
  },
  state: {
    padding: 24,
    gap: 12,
    alignItems: 'center',
  },
  text: {
    color: '#536579',
    fontSize: 16,
  },
  error: {
    color: '#b42318',
  },
  link: {
    color: '#245bb2',
    fontWeight: '600',
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#245bb2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
