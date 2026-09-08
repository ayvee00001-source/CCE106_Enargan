import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function DashboardScreen() {
  return (
    <LinearGradient 
      colors={['#0a1a3a', '#1e3a5f', '#4a1d4e']} 
      style={styles.container}
    >
      <StatusBar style="light" /> 
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        

        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <BlurView intensity={80} tint="dark" style={styles.profile}></BlurView>
        </View>

        

        <View style={styles.cardsContainer}>
          <BlurView intensity={80} tint="dark" style={styles.card}>
            <Text style={styles.cardLabel}>Total Users</Text>
            <Text style={styles.cardValue}>1,204</Text>
          </BlurView>
          <BlurView intensity={80} tint="dark" style={styles.card}>
            <Text style={styles.cardLabel}>Sales</Text>
            <Text style={styles.cardValue}>₱5,430</Text>
          </BlurView>
          <BlurView intensity={80} tint="dark" style={styles.card}>
            <Text style={styles.cardLabel}>Revenue</Text>
            <Text style={styles.cardValue}>₱12,890</Text>
          </BlurView>
        </View>

        

        <BlurView intensity={80} tint="dark" style={styles.activity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>John Smith signed up</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Order #1024 completed</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>New message received</Text>
          </View>
        </BlurView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden', 
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    minWidth: 150,
    padding: 20,
    borderRadius: 16, 
    overflow: 'hidden', 
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)', 
  },
  cardLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)', 
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', 
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  activity: {
    padding: 20,
    borderRadius: 16, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff', 
  },
  activityItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)', 
  },
  activityText: {
    color: 'rgba(255,255,255,0.9)', 
  },
});
