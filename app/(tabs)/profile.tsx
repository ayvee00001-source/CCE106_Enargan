import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = { primary: '#2563eb', background: '#F8FAFC', card: '#FFFFFF' };

export default function Profile() {
  const student = { id: '146779', name: 'Junivy Enargan', course: 'BSIT', year: '3nd Year' };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={50} color={COLORS.primary} />
        </View>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.id}>{student.id}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          {['school', 'calendar', 'mail'].map((icon, i) => (
            <View key={i} style={styles.row}>
              <Ionicons name={icon as any} size={20} color={COLORS.primary} />
              <Text style={styles.value}>{i === 0 ? student.course : i === 1 ? student.year : 'j.enargan.146779.tc@umindanao.edu.ph'}</Text>
            </View>
          ))}
        </View>

        <Link href={`/student/${student.id}`} asChild>
          <Pressable style={styles.button}>
            <Ionicons name="eye" size={18} color="#fff" />
            <Text style={styles.buttonText}> View Full Details</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: COLORS.primary, alignItems: 'center', padding: 30, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  id: { fontSize: 14, color: '#DBEAFE' },
  container: { padding: 20, gap: 15 },
  card: { backgroundColor: COLORS.card, padding: 15, borderRadius: 15, gap: 12, elevation: 2 },
  row: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  value: { fontSize: 16, fontWeight: '500' },
  button: { flexDirection: 'row', backgroundColor: COLORS.primary, padding: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
