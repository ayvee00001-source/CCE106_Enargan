import { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  const [name, setName] = useState('I am Aye');
  const [course, setCourse] = useState('BSIT');
  const [age, setAge] = useState('21');
  const [address, setAddress] = useState('Tagum City');
  const [bio, setBio] = useState('CCE106 Student from Tagum');
  const [showDisplay, setShowDisplay] = useState(true);
  const image = 'attachment://GNwFFi-T0FhGFv8EAEIwc2vIhMpmbog9AAAA';

  const handlePassData = () => {
    if(name.trim() === '' || course.trim() === ''){
      Alert.alert('Error', 'Name and Course cannot be empty');
      return;
    }
    Alert.alert('Saved!', 'Data passed to Display');
  }

  return (
    <ScrollView style={styles.container}>
      {showDisplay && (
        <View style={styles.section}>
          <Text style={styles.header}>DISPLAY VIEW</Text>
          <Image source={{uri: image}} style={styles.profileImage} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.course}>{course}</Text>
          <View style={styles.divider} />
          <Text style={styles.label}>Age</Text><Text style={styles.info}>{age}</Text>
          <Text style={styles.label}>Address</Text><Text style={styles.info}>{address}</Text>
          <Text style={styles.label}>Bio</Text><Text style={styles.info}>{bio}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.header}>INPUT VIEW</Text>
        <Text style={styles.label}>Name</Text><TextInput style={styles.input} value={name} onChangeText={setName}/>
        <Text style={styles.label}>Course</Text><TextInput style={styles.input} value={course} onChangeText={setCourse}/>
        <Text style={styles.label}>Age</Text><TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric"/>
        <Text style={styles.label}>Address</Text><TextInput style={styles.input} value={address} onChangeText={setAddress}/>
        <Text style={styles.label}>Bio</Text><TextInput style={[styles.input, {height: 80}]} value={bio} onChangeText={setBio} multiline/>
        
        <View style={styles.imageRow}>
          <Image source={{uri: image}} style={styles.smallImage} />
          <TouchableOpacity style={styles.blueButton}>
            <Text style={styles.buttonText}>CAPTURE PROFILE PICTURE</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.blueButtonBig} onPress={handlePassData}>
          <Text style={styles.buttonText}>PASS DATA TO DISPLAY</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2a2a2a' },
  section: { backgroundColor: '#3a3a3a', margin: 10, padding: 15, borderRadius: 10 },
  header: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: 'white' },
  profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 10, borderWidth: 2, borderColor: '#007AFF' },
  smallImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  name: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: 'white' },
  course: { fontSize: 14, color: '#bbb', textAlign: 'center', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#555', marginVertical: 10 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#aaa', marginTop: 10 },
  info: { fontSize: 16, marginBottom: 5, color: 'white' },
  input: { borderWidth: 1, borderColor: '#555', padding: 10, borderRadius: 8, marginTop: 5, backgroundColor: '#4a4a4a', color: 'white' },
  imageRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  blueButton: { flex: 1, backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  blueButtonBig: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  buttonText: { color: 'white', fontWeight: 'bold' }
});
