import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatComponent from '../../components/Chat/Chat';

export default function HandymanChat({ route }) {
  // Additional handyman-specific chat functionality can be added here
  // For example, handling job-related messages, status updates, etc.

  return (
    <View style={styles.container}>
      <ChatComponent 
        route={route} 
        userRole="handyman"
        // Add any handyman-specific props here
        // For example, job details, customer information, etc.
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
