import { View, Text, TextInput, Pressable, StyleSheet, useColorScheme, Image, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const PROFILE_KEY = '@student_profile';

export default function Profile() {
  const scheme = useColorScheme();
  const currentTheme = scheme === 'dark'? theme.dark : theme.light;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('');
  const [studentId] = useState('2026-001');
  const [image, setImage] = useState('https://i.pravatar.cc/100');

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
        setName(profile.name || '');
        setEmail(profile.email || '');
        setProgram(profile.program || '');
        setImage(profile.image || 'https://i.pravatar.cc/100');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to load profile');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (name.trim() === '') {
      Alert.alert('Error', 'Full Name is required');
      return;
    }
    try {
      const profile = { name, email, program, studentId, image };
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      Alert.alert('Success', 'Profile Saved!');
    } catch (e) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.bg}]}>
      <View style={[styles.headerCard, {backgroundColor: currentTheme.primary}]}>
        <Pressable style={styles.settingsBtn}>
          <Ionicons name="settings" size={24} color="#fff" />
        </Pressable>
        <Image
          source={{uri: image}}
          style={styles.avatar}
        />
        <Text style={styles.headerTitle}>My Profile</Text>
        <Text style={styles.headerSubtitle}>Update your student information below.</Text>
        <Pressable onPress={pickImage} style={[styles.changeBtn, {backgroundColor: currentTheme.card}]}>
          <Text style={{color: currentTheme.primary, fontWeight: 'bold'}}>Change Profile Picture</Text>
        </Pressable>
      </View>

      <View style={{padding: 20}}>
        <Text style={[styles.sectionTitle, {color: currentTheme.text}]}>Student Information</Text>

        <Text style={[styles.label, {color: currentTheme.subtext}]}>Full Name *</Text>
        <TextInput style={[styles.input, {backgroundColor: currentTheme.card, borderColor: currentTheme.border, color: currentTheme.text}]}
          value={name} onChangeText={setName} placeholder="Juan Dela Cruz" placeholderTextColor={currentTheme.subtext}/>

        <Text style={[styles.label, {color: currentTheme.subtext}]}>Email *</Text>
        <TextInput style={[styles.input, {backgroundColor: currentTheme.card, borderColor: currentTheme.border, color: currentTheme.text}]}
          value={email} onChangeText={setEmail} placeholder="juan@example.com" placeholderTextColor={currentTheme.subtext} keyboardType="email-address"/>

        <Text style={[styles.label, {color: currentTheme.subtext}]}>Program *</Text>
        <TextInput style={[styles.input, {backgroundColor: currentTheme.card, borderColor: currentTheme.border, color: currentTheme.text}]}
          value={program} onChangeText={setProgram} placeholder="BSIT" placeholderTextColor={currentTheme.subtext}/>

        <Text style={[styles.label, {color: currentTheme.subtext}]}>Student ID</Text>
        <TextInput style={[styles.input, {backgroundColor: currentTheme.border, borderColor: currentTheme.border, color: currentTheme.subtext}]}
          value={studentId} editable={false}/>

        <Pressable onPress={handleSave} style={[styles.saveBtn, {backgroundColor: currentTheme.accent}]}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Save Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerCard: { padding: 20, paddingTop: 40, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center' },
  settingsBtn: { position: 'absolute', top: 15, right: 15 },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#fff', marginBottom: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#E2E8F0', marginBottom: 15 },
  changeBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 14, marginBottom: 5 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 15 },
  saveBtn: { padding: 15, borderRadius: 8, alignItems: 'center' }
});
