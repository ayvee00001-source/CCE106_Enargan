import { View, Text, StyleSheet, useColorScheme, Image, ScrollView, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, Link } from 'expo-router';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const PROFILE_KEY = '@student_profile';

export default function Dashboard() {
  const scheme = useColorScheme();
  const currentTheme = scheme === 'dark'? theme.dark : theme.light;
  
  const [name, setName] = useState('Student');
  const [program, setProgram] = useState('Program');
  const [image, setImage] = useState('https://i.pravatar.cc/100');

  const [tasks] = useState([
    {id: '1', title: 'Create Student Portal', subject: 'Mobile Application Development', due: 'September 20, 2026', status: 'Pending'},
    {id: '2', title: 'Database Design Activity', subject: 'Database Management', due: 'September 22, 2026', status: 'Completed'}
  ]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const savedData = await AsyncStorage.getItem(PROFILE_KEY);
      if (savedData!== null) {
        const profile = JSON.parse(savedData);
        setName(profile.name || 'Student');
        setProgram(profile.program || 'Program');
        setImage(profile.image || 'https://i.pravatar.cc/100');
      }
    } catch (e) {}
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pending = total - completed;

  return (
    <ScrollView style={[styles.container, {backgroundColor: currentTheme.bg}]}>
      <View style={styles.header}>
        <Text style={[styles.logo, {color: currentTheme.subtext}]}>STUDYFLOW</Text>
        <Text style={[styles.title, {color: currentTheme.text}]}>Student Dashboard</Text>
        <Pressable style={styles.settingsBtn}>
          <Ionicons name="settings" size={24} color="#fff" />
        </Pressable>
        <Image source={{uri: image}} style={styles.headerAvatar} />
      </View>

      <View style={[styles.welcomeCard, {backgroundColor: '#F3E8FF'}]}>
        <Text style={[styles.welcomeText, {color: '#581C87'}]}>Welcome back,</Text>
        <Text style={[styles.welcomeName, {color: '#581C87'}]}>{name}</Text>
        <Text style={[styles.welcomeProgram, {color: '#581C87'}]}>{program}</Text>
        <Text style={[styles.welcomeDesc, {color: '#581C87'}]}>Keep track of your school tasks, deadlines, and study progress in one place.</Text>
      </View>

      <Text style={[styles.sectionTitle, {color: currentTheme.text}]}>Task Summary</Text>
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, {backgroundColor: currentTheme.card}]}>
          <Text style={[styles.summaryValue, {color: currentTheme.primary}]}>{total}</Text>
          <Text style={[styles.summaryLabel, {color: currentTheme.subtext}]}>Total Tasks</Text>
        </View>
        <View style={[styles.summaryCard, {backgroundColor: currentTheme.card}]}>
          <Text style={[styles.summaryValue, {color: '#16A34A'}]}>{completed}</Text>
          <Text style={[styles.summaryLabel, {color: currentTheme.subtext}]}>Completed</Text>
        </View>
        <View style={[styles.summaryCard, {backgroundColor: currentTheme.card}]}>
          <Text style={[styles.summaryValue, {color: '#D97706'}]}>{pending}</Text>
          <Text style={[styles.summaryLabel, {color: currentTheme.subtext}]}>Pending</Text>
        </View>
      </View>

      <View style={styles.tasksHeader}>
        <Text style={[styles.sectionTitle, {color: currentTheme.text}]}>My Tasks</Text>
        <Link href="/tasks"><Text style={{color: currentTheme.primary, fontWeight: 'bold'}}>View All</Text></Link>
      </View>

      {tasks.map(task => (
        <View key={task.id} style={[styles.taskCard, {backgroundColor: currentTheme.card}]}>
          <Text style={[styles.taskSubject, {color: currentTheme.subtext}]}>{task.subject}</Text>
          <Text style={[styles.taskTitle, {color: currentTheme.text}]}>{task.title}</Text>
          <Text style={[styles.taskDue, {color: currentTheme.subtext}]}>Due: {task.due}</Text>
          <View style={[styles.statusBadge, {backgroundColor: task.status === 'Pending'? '#FEE2E2' : '#DCFCE7'}]}>
            <Text style={{color: task.status === 'Pending'? '#B91C1C' : '#166534', fontWeight: 'bold', fontSize: 12}}>{task.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 40 },
  logo: { fontSize: 12, fontWeight: 'bold', letterSpacing: 2 },
  title: { fontSize: 26, fontWeight: 'bold' },
  settingsBtn: { position: 'absolute', top: 40, right: 20, backgroundColor: '#2563EB', padding: 10, borderRadius: 20 },
  headerAvatar: { position: 'absolute', top: 40, right: 70, width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#fff' },
  welcomeCard: { margin: 20, padding: 20, borderRadius: 16 },
  welcomeText: { fontSize: 14 },
  welcomeName: { fontSize: 22, fontWeight: 'bold' },
  welcomeProgram: { fontSize: 14, marginBottom: 10 },
  welcomeDesc: { fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 10 },
  summaryRow: { flexDirection: 'row', paddingHorizontal: 15 },
  summaryCard: { flex: 1, margin: 5, padding: 15, borderRadius: 12, alignItems: 'center' },
  summaryValue: { fontSize: 28, fontWeight: 'bold' },
  summaryLabel: { fontSize: 12 },
  tasksHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 },
  taskCard: { marginHorizontal: 20, marginVertical: 8, padding: 15, borderRadius: 12 },
  taskSubject: { fontSize: 12 },
  taskTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 4 },
  taskDue: { fontSize: 12, marginBottom: 10 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 }
});
