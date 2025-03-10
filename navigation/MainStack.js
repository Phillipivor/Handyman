import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

// Import screens
import LoginScreen from '../screens/Auth/LoginScreen';
import AdminStack from './AdminStack';
import ServiceProviderStack from './ServiceProviderStack';
import HandymanStack from './HandymanStack';
import UserStack from './UserStack';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        // Auth Stack
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        // Role-based Stack
        <>
          {user.role === 'admin' && (
            <Stack.Screen name="AdminStack" component={AdminStack} />
          )}
          {user.role === 'service_provider' && (
            <Stack.Screen name="ServiceProviderStack" component={ServiceProviderStack} />
          )}
          {user.role === 'handyman' && (
            <Stack.Screen name="HandymanStack" component={HandymanStack} />
          )}
          {user.role === 'user' && (
            <Stack.Screen name="UserStack" component={UserStack} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}
