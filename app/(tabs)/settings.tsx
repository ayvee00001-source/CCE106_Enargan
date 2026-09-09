import { View, Text, Pressable, StyleSheet, Alert, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const COLORS = { primary: '#2563eb', danger: '#ef4444', background: '#F8FAFC', card: '#FFFFFF' };

export default function Settings() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, padding: 20, gap: 15 }}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="notifications" size={20} color={COLORS.primary} />
          <Text style={{ flex: 1 }}>Push Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => Alert.alert('Coming Soon')}>
        <Ionicons name="pencil" size={18} color="#fff" />
        <Text style={styles.buttonText}> Edit Profile</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: COLORS.danger }]} onPress={() => Alert.alert('Logged Out')}>
        <Ionicons name="log-out" size={18} color="#fff" />
        <Text style={styles.buttonText}> Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold' },
  card: { backgroundColor: COLORS.card, padding: 15, borderRadius: 15, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  button: { flexDirection: 'row', backgroundColor: COLORS.primary, padding: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
