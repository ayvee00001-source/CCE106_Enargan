import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function StudentDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Details</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Student ID:</Text>
        <Text style={styles.value}>{id}</Text>
        <Text style={styles.label}>GPA:</Text>
        <Text style={styles.value}>2.00</Text>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>Enrolled</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 15 },
  title: { fontSize: 24, fontWeight: 'bold' },
  card: { backgroundColor: '#f3f4f6', padding: 15, borderRadius: 10, gap: 8 },
  label: { fontSize: 12, color: '#666' },
  value: { fontSize: 16, fontWeight: '600' }
});
