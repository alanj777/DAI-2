import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmergencyNumber = () => {
  const [number, setNumber] = useState('');

  useEffect(() => {
    const loadNumber = async () => {
      const savedNumber = await AsyncStorage.getItem('emergencyNumber');
      if (savedNumber) setNumber(savedNumber);
    };
    loadNumber();
  }, []);

  const saveNumber = async () => {
    if (number.length < 10) {
      Alert.alert('Error', 'Número de emergencia inválido.');
      return;
    }
    await AsyncStorage.setItem('emergencyNumber', number);
    Alert.alert('Éxito', 'Número de emergencia guardado.');
  };

  return (
    <View>
      <TextInput
        placeholder="Número de emergencia"
        value={number}
        onChangeText={setNumber}
        keyboardType="phone-pad"
      />
      <Button title="Guardar" onPress={saveNumber} />
    </View>
  );
};

export default EmergencyNumber;
