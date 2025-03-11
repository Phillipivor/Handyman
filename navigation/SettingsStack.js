import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Import Settings Screens
import GeneralSettings from '../screens/Admin/Settings/General';
import ServiceConfig from '../screens/Admin/Settings/ServiceConfig';
import PaymentConfig from '../screens/Admin/Settings/Payment';

const Tab = createMaterialTopTabNavigator();

export default function SettingsStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#2563eb',
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          textTransform: 'none',
        },
      }}
    >
      <Tab.Screen 
        name="General" 
        component={GeneralSettings}
        options={{
          title: 'General',
        }}
      />
      <Tab.Screen 
        name="Service" 
        component={ServiceConfig}
        options={{
          title: 'Service',
        }}
      />
      <Tab.Screen 
        name="Payment" 
        component={PaymentConfig}
        options={{
          title: 'Payment',
        }}
      />
    </Tab.Navigator>
  );
}
