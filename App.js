import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import { AdminSettingsProvider } from './context/AdminSettingsContext';
import MainStack from './navigation/MainStack';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <AuthProvider>
          <AdminSettingsProvider>
            <MainStack />
          </AdminSettingsProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
