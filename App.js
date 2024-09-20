import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmergencyNumber from './EmergencyNumber';
import ContactList from './ContactList';
import CurrentTimeWeather from './CurrentTimeWeather';
import EmergencyCall from './EmergencyCall';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Emergencia" component={EmergencyNumber} />
        <Tab.Screen name="Contactos" component={ContactList} />
        <Tab.Screen name="Hora y Temperatura" component={CurrentTimeWeather} />
        <Tab.Screen name="Llamado de Emergencia" component={EmergencyCall} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
