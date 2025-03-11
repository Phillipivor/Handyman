import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Stacks
import AdminDrawer from './AdminDrawer';
import ServiceProviderStack from './ServiceProviderStack';
import HandymanStack from './HandymanStack';
import UserStack from './UserStack';

// Import Auth Screen
import LoginScreen from '../screens/Auth/LoginScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Auth Screens */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
      />

      {/* Role-based Navigation */}
      <Stack.Screen 
        name="AdminPanel" 
        component={AdminDrawer}
      />
      <Stack.Screen 
        name="ServiceProviderPanel" 
        component={ServiceProviderStack}
      />
      <Stack.Screen 
        name="HandymanPanel" 
        component={HandymanStack}
      />
      <Stack.Screen 
        name="UserPanel" 
        component={UserStack}
      />
    </Stack.Navigator>
  );
}
