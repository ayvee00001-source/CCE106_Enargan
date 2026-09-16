import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { theme } from '../../theme';

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scheme = useColorScheme();
  const currentTheme = scheme === 'dark'? theme.dark : theme.light;
  
  const [tasks] = useState([
    {id: '1', title: 'Math HW Ch.5', subject: 'Math', due: 'Sept 20', status: 'Pending'},
    {id: '2', title: 'Science Lab Report', subject: 'Science', due: 'Sept 18', status: 'Completed'},
    {id: '3', title: 'English Essay', subject: 'English', due: 'Sept 22', status: 'Pending'},
    {id: '4', title: 'History Quiz', subject: 'History', due: 'Sept 17', status: 'Completed'},
    {id: '5', title: 'Coding Project', subject: 'IT', due: 'Sept 25', status: 'Pending'},
  ]);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <View style={[styles.container, {backgroundColor: currentTheme.bg}]}>
        <Text style={[styles.error, {color: 'red'}]}>Task Not Found</Text>
        <Pressable onPress={() => router.back()} style={[styles.btn, {backgroundColor: currentTheme.primary}]}>
          <Text style={{color: '#fff'}}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.bg}]}>
      <Text style={[styles.title, {color: currentTheme.text}]}>{task.title}</Text>
      <Text style={{color: currentTheme.subtext}}>Subject: {task.subject}</Text>
      <Text style={{color: currentTheme.subtext}}>Due: {task.due}</Text>
      <Text style={{color: task.status === 'Completed'? currentTheme.success : '#F59E0B'}}>Status: {task.status}</Text>
      <Pressable style={[styles.btn, {backgroundColor: currentTheme.primary}]}>
        <Text style={{color: '#fff'}}>{task.status === 'Pending'? 'Mark Complete' : 'Mark Pending'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  btn: { padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  error: { fontSize: 18 }
});
