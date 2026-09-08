import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  return (
    <LinearGradient colors={['#0a1a3a', '#1a2a5a']} style={styles.container}>
      <Text style={styles.text}>⚙️ Settings Page</Text>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: 'white', fontSize: 28, fontWeight: 'bold' }
})
