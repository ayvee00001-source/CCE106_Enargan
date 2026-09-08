import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  return (
    <LinearGradient colors={['#0a1a3a', '#1a2a5a']} style={styles.container}>
      <Text style={styles.text}>👤 Profile Page</Text>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: 'white', fontSize: 28, fontWeight: 'bold' }
})
