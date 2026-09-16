import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { theme } from '../theme';

export default function Explore() {
  const scheme = useColorScheme();
  const currentTheme = scheme === 'dark'? theme.dark : theme.light;

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.bg}]}>
      <Text style={[styles.title, {color: currentTheme.text}]}>Explore</Text>
      <Text style={{color: currentTheme.subtext}}>Dito pwede mo ilagay tips, quotes, or stats</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});
