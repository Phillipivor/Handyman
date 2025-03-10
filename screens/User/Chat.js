import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatComponent from '../../components/Chat/Chat';

export default function UserChat({ route }) {
  // Additional user-specific chat functionality can be added here
  // For example, handling user-specific notifications, chat history, etc.

  return (
    <View style={styles.container}>
      <ChatComponent 
        route={route} 
        userRole="user"
        // Add any user-specific props here
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
