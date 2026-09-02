import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const calculate = (operation) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    // Validate empty or invalid input
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
        // Prevent division by zero
        if (b === 0) {
          Alert.alert('Error', 'Cannot divide by zero');
          return;
        }
        res = a / b; 
        break;
    }
    setResult(res.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => calculate('+')}><Text style={styles.btnText}>+</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => calculate('-')}><Text style={styles.btnText}>-</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => calculate('*')}><Text style={styles.btnText}>×</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => calculate('/')}><Text style={styles.btnText}>÷</Text></TouchableOpacity>
      </View>

      {result !== '' && (
        <View style={styles.card}>
          <Text style={styles.resultLabel}>Result:</Text>
          <Text style={styles.result}>{result}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#6366F1', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, fontSize: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, gap: 10 },
  btn: { flex: 1, backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center' },
  btnText: { fontSize: 24, fontWeight: 'bold', color: '#6366F1' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 20, alignItems: 'center' },
  resultLabel: { fontSize: 16, color: '#6B7280' },
  result: { fontSize: 36, fontWeight: 'bold', color: '#1F2937', marginTop: 5 }
});
