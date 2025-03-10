import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/User/Home';
import ServiceDetails from '../screens/User/ServiceDetails';
import RequestService from '../screens/User/RequestService';
import Profile from '../screens/User/Profile';
import Payment from '../screens/User/Payment';
import Chat from '../screens/User/Chat';
import MyBookings from '../screens/User/MyBookings';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#059669',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          title: 'Available Services'
        }}
      />
      <Stack.Screen 
        name="ServiceDetails" 
        component={ServiceDetails}
        options={{
          title: 'Service Details'
        }}
      />
      <Stack.Screen 
        name="RequestService" 
        component={RequestService}
        options={{
          title: 'Request Service'
        }}
      />
      <Stack.Screen 
        name="MyBookings" 
        component={MyBookings}
        options={{
          title: 'My Bookings'
        }}
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={{
          title: 'My Profile'
        }}
      />
      <Stack.Screen 
        name="Payment" 
        component={Payment}
        options={{
          title: 'Payment'
        }}
      />
      <Stack.Screen 
        name="Chat" 
        component={Chat}
        options={{
          title: 'Chat with Handyman'
        }}
      />
    </Stack.Navigator>
  );
}
