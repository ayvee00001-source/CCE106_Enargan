import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function DashboardScreen() {
  return (
    <LinearGradient colors={['#0a1a3a', '#1a2a5a', '#0a1a3a']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Dashboard</Text>
        
        <BlurView intensity={30} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Welcome Back!</Text>
          <Text style={styles.cardText}>CCE106 Mobile Dashboard</Text>
        </BlurView>

        <BlurView intensity={30} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Stats</Text>
          <Text style={styles.cardText}>Feature: Dashboard Active</Text>
        </BlurView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingTop: 60 },
  title: { fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  card: { 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  cardTitle: { fontSize: 20, fontWeight: '600', color: 'white', marginBottom: 5 },
  cardText: { fontSize: 14, color: 'rgba(255,255,255,0.8)' }
});
