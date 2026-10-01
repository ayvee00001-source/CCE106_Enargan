import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import StudentCard, { type Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';

export default function StudentsScreen() {
  const { token, logout } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const loadStudents = async () => {
    setLoading(true);
    setError('');

    try {
      if (!token) {
        throw new Error('You are not authenticated.');
      }

      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        await logout();
        throw new Error(
          'Your session has expired. Please sign in again.'
        );
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load students (${response.status}).`
        );
      }

      const data = await response.json();

      const studentList = Array.isArray(data)
        ? data
        : Array.isArray(data?.students)
          ? data.students
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setStudents(studentList);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load students.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // The loader intentionally updates loading/data/error state after the API request.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const filteredStudents = students.filter((student) => {
    const name = student.name ?? '';

    return name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  if (loading) {
    return (
      <View style={styles.state}>
        <ActivityIndicator color="#245bb2" />
        <Text style={styles.text}>Loading student records…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.state}>
        <Text style={styles.error}>{error}</Text>

        <Pressable
          accessibilityRole="button"
          style={styles.retryButton}
          onPress={loadStudents}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>STUDENTS</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search students..."
        placeholderTextColor="#8a98a8"
        style={styles.search}
      />

      {filteredStudents.length === 0 ? (
        <View style={styles.state}>
          <Text style={styles.text}>
            {search.trim()
              ? 'No students match your search.'
              : 'No student records found.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item, index) =>
            item.id !== undefined
              ? String(item.id)
              : String(index)
          }
          renderItem={({ item }) => (
            <StudentCard student={item} />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f5fa',
  },
  title: {
    color: '#17324d',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  search: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d7dee8',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#17324d',
    marginBottom: 16,
  },
  list: {
    gap: 12,
    paddingBottom: 20,
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
  retryButton: {
    backgroundColor: '#245bb2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
