import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Admin/Dashboard';
import ManageUsers from '../screens/Admin/ManageUsers';
import Reports from '../screens/Admin/Reports';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          title: 'Admin Dashboard'
        }}
      />
      <Stack.Screen 
        name="ManageUsers" 
        component={ManageUsers}
        options={{
          title: 'Manage Users'
        }}
      />
      <Stack.Screen 
        name="Reports" 
        component={Reports}
        options={{
          title: 'Reports'
        }}
      />
    </Stack.Navigator>
  );
}
