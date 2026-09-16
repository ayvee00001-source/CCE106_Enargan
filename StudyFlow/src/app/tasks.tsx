import { View, Text, FlatList, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { theme } from '../theme';

const TaskCard = ({ task, onPress, currentTheme }: any) => (
  <Pressable onPress={onPress} style={[styles.taskCard, {backgroundColor: currentTheme.card, borderColor: currentTheme.border}]}>
    <Text style={[styles.taskTitle, {color: currentTheme.text}]}>{task.title}</Text>
    <Text style={{color: currentTheme.subtext}}>Subject: {task.subject}</Text>
    <Text style={{color: currentTheme.subtext}}>Due: {task.due}</Text>
    <Text style={{color: task.status === 'Completed'? currentTheme.success : '#F59E0B'}}>Status: {task.status}</Text>
  </Pressable>
);

export default function Tasks() {
  const router = useRouter();
  const scheme = useColorScheme();
  const currentTheme = scheme === 'dark'? theme.dark : theme.light;
  
  const [filter, setFilter] = useState('All');
  const [tasks] = useState([
    {id: '1', title: 'Math HW Ch.5', subject: 'Math', due: 'Sept 20', status: 'Pending'},
    {id: '2', title: 'Science Lab Report', subject: 'Science', due: 'Sept 18', status: 'Completed'},
    {id: '3', title: 'English Essay', subject: 'English', due: 'Sept 22', status: 'Pending'},
    {id: '4', title: 'History Quiz', subject: 'History', due: 'Sept 17', status: 'Completed'},
    {id: '5', title: 'Coding Project', subject: 'IT', due: 'Sept 25', status: 'Pending'},
  ]);

  const filteredTasks = tasks.filter(t => filter === 'All'? true : t.status === filter);

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.bg}]}>
      <View style={styles.filterRow}>
        {['All', 'Pending', 'Completed'].map(f => (
          <Pressable key={f} onPress={() => setFilter(f)} 
            style={[styles.filterBtn, {borderColor: currentTheme.border, backgroundColor: filter === f? currentTheme.primary : currentTheme.card}]}>
            <Text style={{color: filter === f? '#fff' : currentTheme.text}}>{f}</Text>
          </Pressable>
        ))}
      </View>
      
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskCard task={item} currentTheme={currentTheme} onPress={() => router.push(`/task/${item.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  filterBtn: { padding: 10, borderWidth: 1, borderRadius: 8 },
  taskCard: { padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, elevation: 2 },
  taskTitle: { fontSize: 16, fontWeight: 'bold' }
});
