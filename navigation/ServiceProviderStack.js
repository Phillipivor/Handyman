import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Jobs from '../screens/ServiceProvider/Jobs';
import Schedule from '../screens/ServiceProvider/Schedule';
import Notifications from '../screens/ServiceProvider/Notifications';
import Profile from '../screens/ServiceProvider/Profile';

const Stack = createNativeStackNavigator();

export default function ServiceProviderStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0891b2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Jobs" 
        component={Jobs}
        options={{
          title: 'Available Jobs'
        }}
      />
      <Stack.Screen 
        name="Schedule" 
        component={Schedule}
        options={{
          title: 'My Schedule'
        }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={Notifications}
        options={{
          title: 'Notifications'
        }}
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={{
          title: 'My Profile'
        }}
      />
    </Stack.Navigator>
  );
}
