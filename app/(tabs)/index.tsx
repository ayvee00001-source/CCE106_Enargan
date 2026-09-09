import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';

const COLORS = { 
  primary: '#4F46E5', 
  background: '#F1F5F9', 
  card: '#FFFFFF', 
  text: '#0F172A', 
  subtext: '#64748B', 
  success: '#22C55E', 
  warning: '#F59E0B', 
  danger: '#EF4444' 
}; 

const SPACING = 16;

function MetricCard({ title, value, change, icon, color }: any) { 
  return ( 
    <View style={styles.metricCard}> 
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> 
        <Ionicons name={icon} size={24} color={color} /> 
        <Text style={[styles.change, { color: change.includes('+') ? COLORS.success : COLORS.danger }]}>
          {change}
        </Text> 
      </View> 
      <Text style={styles.metricValue}>{value}</Text> 
      <Text style={styles.metricTitle}>{title}</Text> 
    </View> 
  ); 
}

export default function Dashboard() { 
  const { width } = useWindowDimensions(); 
  const isWide = width > 600;
  
  return ( 
    <ScrollView style={{ backgroundColor: COLORS.background }}> 
      <View style={styles.header}> 
        <View> 
          <Text style={styles.headerTitle}>Dashboard</Text> 
          <Text style={styles.headerSub}>Welcome back, Juan</Text> 
        </View> 
        <Pressable style={styles.profileBtn}> 
          <Ionicons name="person-circle" size={40} color={COLORS.primary} /> 
        </Pressable> 
      </View> 
      
      <View style={[styles.cardsContainer, isWide && styles.cardsRow]}> 
        <MetricCard title="Total Students" value="1,245" change="+12%" icon="people" color={COLORS.primary} /> 
        <MetricCard title="Revenue" value="₱45,200" change="+8%" icon="cash" color={COLORS.success} /> 
        <MetricCard title="Pending Tasks" value="24" change="-5%" icon="alert-circle" color={COLORS.warning} /> 
      </View> 
      
      <View style={styles.section}> 
        <Text style={styles.sectionTitle}>Quick Actions</Text> 
        <View style={styles.actionsRow}> 
          <Pressable style={styles.actionBtn}> 
            <Ionicons name="add-circle" size={20} color={COLORS.primary} /> 
            <Text>Add Student</Text> 
          </Pressable> 
          <Pressable style={styles.actionBtn}> 
            <Ionicons name="document-text" size={20} color={COLORS.primary} /> 
            <Text>Reports</Text> 
          </Pressable> 
        </View> 
      </View> 
      
      <View style={styles.section}> 
        <Text style={styles.sectionTitle}>Recent Activity</Text> 
        <View style={styles.activityCard}> 
          <Ionicons name="checkmark-circle" size={20} color={COLORS.success} /> 
          <View style={{ flex: 1 }}> 
            <Text style={styles.activityText}>New enrollment: Maria Santos</Text> 
            <Text style={styles.activityTime}>2 mins ago</Text> 
          </View> 
        </View> 
        <View style={styles.activityCard}> 
          <Ionicons name="card" size={20} color={COLORS.primary} /> 
          <View style={{ flex: 1 }}> 
            <Text style={styles.activityText}>Payment received: ₱5,000</Text> 
            <Text style={styles.activityTime}>1 hour ago</Text> 
          </View> 
        </View> 
      </View> 
    </ScrollView> 
  ); 
}

const styles = StyleSheet.create({ 
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: SPACING * 1.5, 
    backgroundColor: COLORS.card, 
    borderBottomWidth: 1, 
    borderColor: '#E2E8F0' 
  }, 
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text }, 
  headerSub: { fontSize: 14, color: COLORS.subtext }, 
  profileBtn: { padding: 4 }, 
  cardsContainer: { padding: SPACING, gap: SPACING }, 
  cardsRow: { flexDirection: 'row', flexWrap: 'wrap' }, 
  metricCard: { 
    backgroundColor: COLORS.card, 
    padding: SPACING, 
    borderRadius: 12, 
    flex: 1, 
    minWidth: 150, 
    elevation: 2 
  }, 
  metricValue: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginTop: 8 }, 
  metricTitle: { fontSize: 14, color: COLORS.subtext }, 
  change: { fontSize: 12, fontWeight: '600' }, 
  section: { padding: SPACING }, 
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: SPACING }, 
  actionsRow: { flexDirection: 'row', gap: SPACING }, 
  actionBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    backgroundColor: COLORS.card, 
    padding: 12, 
    borderRadius: 10, 
    flex: 1, 
    elevation: 1 
  }, 
  activityCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    backgroundColor: COLORS.card, 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 10, 
    elevation: 1 
  }, 
  activityText: { fontSize: 14, color: COLORS.text, fontWeight: '500' }, 
  activityTime: { fontSize: 12, color: COLORS.subtext } 
});
