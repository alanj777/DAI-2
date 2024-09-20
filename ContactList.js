import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState('');

  useEffect(() => {
    const loadContacts = async () => {
      const { data } = await Contacts.getContactsAsync();
      setContacts(data);
      const savedEmergencyContact = await AsyncStorage.getItem('emergencyNumber');
      setEmergencyContact(savedEmergencyContact);
    };
    loadContacts();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.phoneNumbers ? item.phoneNumbers[0].number : 'Sin número'}</Text>
      {item.phoneNumbers && item.phoneNumbers[0].number === emergencyContact && <Text>⭐️ Emergencia</Text>}
    </View>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ContactList;
