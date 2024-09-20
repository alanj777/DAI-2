import React from 'react';
import { View, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmergencyCall = () => {
  const sendSMS = async (number) => {
    await SMS.sendSMSAsync([number], '¡Necesito ayuda!');
  };

  const handleShake = async () => {
    const number = await AsyncStorage.getItem('emergencyNumber');
    if (number) {
      sendSMS(number);
      Alert.alert('Emergencia', 'Mensaje enviado.');
    } else {
      Alert.alert('Error', 'Número de emergencia no configurado.');
    }
  };

  React.useEffect(() => {
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const shakeThreshold = 1.5;
      if (Math.sqrt(x * x + y * y + z * z) > shakeThreshold) {
        handleShake();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <View />;
};

export default EmergencyCall;
