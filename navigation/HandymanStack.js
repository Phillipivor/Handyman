import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Assignments from '../screens/Handyman/Assignments';
import JobStatus from '../screens/Handyman/JobStatus';
import UploadImages from '../screens/Handyman/UploadImages';
import Chat from '../screens/Handyman/Chat';
import Profile from '../screens/Handyman/Profile';

const Stack = createNativeStackNavigator();

export default function HandymanStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7c3aed',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Assignments" 
        component={Assignments}
        options={{
          title: 'My Assignments'
        }}
      />
      <Stack.Screen 
        name="JobStatus" 
        component={JobStatus}
        options={{
          title: 'Update Job Status'
        }}
      />
      <Stack.Screen 
        name="UploadImages" 
        component={UploadImages}
        options={{
          title: 'Upload Job Images'
        }}
      />
      <Stack.Screen 
        name="Chat" 
        component={Chat}
        options={{
          title: 'Customer Chat'
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
