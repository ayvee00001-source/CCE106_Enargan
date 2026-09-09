import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function CourseDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course: {id}</Text>
      <View style={styles.card}>
        <Text>Instructor: Prof. Eljay</Text>
        <Text>Schedule: Mon/Wed 8:00-10:00 AM</Text>
        <Text>Room: Building 2</Text>
      </View>
      <Text>This screen opens above the tabs using Stack navigation.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 15 },
  title: { fontSize: 24, fontWeight: 'bold' },
  card: { backgroundColor: '#f3f4f6', padding: 15, borderRadius: 10, gap: 8 }
});
