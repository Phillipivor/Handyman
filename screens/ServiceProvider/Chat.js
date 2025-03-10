import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatComponent from '../../components/Chat/Chat';

export default function ServiceProviderChat({ route }) {
  // Additional service provider-specific chat functionality can be added here
  // For example, handling multiple conversations with customers and handymen,
  // service inquiries, scheduling discussions, etc.

  return (
    <View style={styles.container}>
      <ChatComponent 
        route={route} 
        userRole="service_provider"
        // Add any service provider-specific props here
        // For example, service details, team information, etc.
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});
