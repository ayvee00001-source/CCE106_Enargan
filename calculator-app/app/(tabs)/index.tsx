import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const calculate = (operation) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      Alert.alert('Error', 'Please enter two valid numbers');
      return;
    }
    let res = 0;
    switch(operation) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/': 
        if (b === 0) {
          Alert.alert('Error', 'Cannot divide by zero');
          return;
        }
        res = a / b; 
        break;
    }
    setResult(res.toString());
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setResult('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Simple Calculator</Text>
        
        <TextInput style={styles.input} placeholder="First number" placeholderTextColor="#9CA3AF" keyboardType="numeric" value={num1} onChangeText={setNum1} />
        <TextInput style={styles.input} placeholder="Second number" placeholderTextColor="#9CA3AF" keyboardType="numeric" value={num2} onChangeText={setNum2} />

        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={() => calculate('+')}><Text style={styles.btnText}>+</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => calculate('-')}><Text style={styles.btnText}>-</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => calculate('*')}><Text style={styles.btnText}>×</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => calculate('/')}><Text style={styles.btnText}>÷</Text></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>C</Text>
        </TouchableOpacity>

        {result !== '' && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Result:</Text>
            <Text style={styles.result}>{result}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F2937', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#374151', padding: 25, borderRadius: 20, elevation: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F9FAFB', textAlign: 'center', marginBottom: 25 },
  input: { backgroundColor: '#4B5563', color: '#F9FAFB', padding: 15, borderRadius: 12, marginBottom: 15, fontSize: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, gap: 10 },
  btn: { flex: 1, backgroundColor: '#3B82F6', padding: 20, borderRadius: 12, alignItems: 'center' },
  btnText: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  resetBtn: { backgroundColor: '#EF4444', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  resetBtnText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  resultCard: { backgroundColor: '#4B5563', padding: 20, borderRadius: 15, alignItems: 'center' },
  resultLabel: { fontSize: 16, color: '#9CA3AF' },
  result: { fontSize: 36, fontWeight: 'bold', color: '#3B82F6', marginTop: 5 }
});
