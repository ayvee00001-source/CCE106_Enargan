import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#2563eb',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#1E293B'
};

const courses = [
  { id: 'CS101', name: 'Intro to Programming' },
  { id: 'MATH202', name: 'Discrete Math' },
  { id: 'IT205', name: 'Web Development' },
];

export default function Home() {
  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome Junivy!</Text>
        <Text style={styles.summary}>3 courses enrolled this semester</Text>
      </View>
      
      <View style={styles.container}>
        <Text style={styles.section}>Your Courses</Text>
        {courses.map(course => (
          <Link key={course.id} href={`/course/${course.id}`} asChild>
            <Pressable style={styles.card}>
              <Ionicons name={course.icon as any} size={28} color={COLORS.primary} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cardTitle}>{course.id}</Text>
                <Text style={styles.cardSub}>{course.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: COLORS.primary, padding: 25, paddingBottom: 30, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  greeting: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  summary: { fontSize: 14, color: '#DBEAFE', marginTop: 4 },
  container: { padding: 20, gap: 12 },
  section: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginTop: 10 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: COLORS.card, borderRadius: 15, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  cardSub: { fontSize: 13, color: '#64748B' }
});
