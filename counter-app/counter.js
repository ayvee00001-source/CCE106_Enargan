import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Counter({ increment = 1 }) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(prev => prev + increment);
  const handleDecrement = () => setCount(prev => (prev - increment < 0 ? 0 : prev - increment));
  const handleReset = () => setCount(0);

  return (
    <View style={styles.container}>
      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Current Counter Value</Text>
        <Text style={styles.count}>{count}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.buttonMinus]} onPress={handleDecrement}>
          <Text style={styles.buttonText}>- {increment}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonReset]} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonPlus]} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+ {increment}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6366F1', // background color - indigo
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF', // card background - white
    padding: 30,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10, // shadow for android
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 10,
    fontWeight: '500',
  },
  count: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonMinus: {
    backgroundColor: '#EF4444', // red
  },
  buttonReset: {
    backgroundColor: '#6B7280', // gray
  },
  buttonPlus: {
    backgroundColor: '#22C55E', // green
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
