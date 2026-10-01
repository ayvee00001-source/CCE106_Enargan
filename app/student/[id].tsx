import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { type Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token, logout } = useAuth();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = async () => {
    const studentId = Array.isArray(id) ? id[0] : id;

    if (!studentId) {
      setError('Student ID is required.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    setStudent(null);

    try {
      if (!token) {
        throw new Error('You are not authenticated.');
      }

      const response = await fetch(
        `${API_BASE_URL}/students/${encodeURIComponent(studentId)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        await logout();
        throw new Error(
          'Your session has expired. Please sign in again.'
        );
      }

      if (response.status === 404) {
        throw new Error('Student record not found.');
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load student (${response.status}).`
        );
      }

      const data = await response.json();
      const record = data?.student ?? data?.data ?? data;

      if (!record || typeof record !== 'object') {
        throw new Error(
          'Student record was not returned by the server.'
        );
      }

      setStudent(record as Student);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load student.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // The loader intentionally updates loading/data/error state after the API request.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  if (loading) {
    return (
      <View style={styles.state}>
        <ActivityIndicator color="#245bb2" />
        <Text style={styles.text}>Loading student…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.state}>
        <Text style={styles.error}>{error}</Text>

        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={loadStudent}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.state}>
        <Text style={styles.text}>
          No student record available.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>STUDENT DETAILS</Text>

      <View style={styles.card}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.value}>
          {student.id !== undefined ? String(student.id) : '—'}
        </Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>
          {student.name || '—'}
        </Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {student.email || '—'}
        </Text>

        <Text style={styles.label}>Course</Text>
        <Text style={styles.value}>
          {student.course || '—'}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>BACK TO STUDENTS</Text>
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
    borderRadius: 12,
    padding: 20,
    gap: 10,
  },
  label: {
    color: '#7a8999',
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    color: '#17324d',
    fontSize: 17,
    marginBottom: 8,
  },
  state: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: '#f2f5fa',
  },
  text: {
    color: '#536579',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: '#b42318',
    fontSize: 16,
    textAlign: 'center',
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
