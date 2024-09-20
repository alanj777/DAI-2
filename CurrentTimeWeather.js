import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const CurrentTimeWeather = () => {
  const [time, setTime] = useState('');
  const [temperature, setTemperature] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${location.coords.latitude},${location.coords.longitude}`);
      setTemperature(response.data.current.temp_c);
    };

    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    fetchWeather();
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Hora Actual: {time}</Text>
      <Text>Temperatura: {temperature} °C</Text>
    </View>
  );
};

export default CurrentTimeWeather;
