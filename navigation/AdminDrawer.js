import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import Admin Screens
import Dashboard from '../screens/Admin/Dashboard';
import Bookings from '../screens/Admin/Bookings';
import Users from '../screens/Admin/Users';
import Ratings from '../screens/Admin/Ratings';
import CustomJobs from '../screens/Admin/CustomJobs';

// Import Service Screens
import Category from '../screens/Admin/Service/Category';
import SubCategory from '../screens/Admin/Service/SubCategory';
import AllServices from '../screens/Admin/Service/AllServices';
import Addons from '../screens/Admin/Service/Addons';
import Packages from '../screens/Admin/Service/Packages';

// Import Transaction Screens
import Payments from '../screens/Admin/Transactions/Payments';
import Earnings from '../screens/Admin/Transactions/Earnings';
import WithdrawalRequests from '../screens/Admin/Transactions/WithdrawalRequests';

// Import Promotion Screens
import Coupons from '../screens/Admin/Promotions/Coupons';
import Sliders from '../screens/Admin/Promotions/Sliders';

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        drawerActiveBackgroundColor: '#2563eb',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#1e293b',
      }}
    >
      {/* Main */}
      <Drawer.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>📊</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Bookings" 
        component={Bookings}
        options={{
          title: 'Bookings',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>📅</Text>
          ),
        }}
      />

      {/* Services */}
      <Drawer.Screen 
        name="ServiceCategory" 
        component={Category}
        options={{
          title: 'Service Categories',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>📁</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="ServiceSubCategory" 
        component={SubCategory}
        options={{
          title: 'Sub-Categories',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>📂</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="AllServices" 
        component={AllServices}
        options={{
          title: 'All Services',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🛠️</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="ServiceAddons" 
        component={Addons}
        options={{
          title: 'Service Add-ons',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>➕</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="ServicePackages" 
        component={Packages}
        options={{
          title: 'Service Packages',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>📦</Text>
          ),
        }}
      />

      {/* Custom Jobs */}
      <Drawer.Screen 
        name="CustomJobs" 
        component={CustomJobs}
        options={{
          title: 'Custom Jobs',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🔧</Text>
          ),
        }}
      />

      {/* Users */}
      <Drawer.Screen 
        name="Users" 
        component={Users}
        options={{
          title: 'User Management',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>👥</Text>
          ),
        }}
      />

      {/* Transactions */}
      <Drawer.Screen 
        name="Payments" 
        component={Payments}
        options={{
          title: 'Payments',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>💳</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Earnings" 
        component={Earnings}
        options={{
          title: 'Earnings',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>💰</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="WithdrawalRequests" 
        component={WithdrawalRequests}
        options={{
          title: 'Withdrawals',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>💸</Text>
          ),
        }}
      />

      {/* Promotions */}
      <Drawer.Screen 
        name="Coupons" 
        component={Coupons}
        options={{
          title: 'Coupons',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🎟️</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Sliders" 
        component={Sliders}
        options={{
          title: 'Promo Sliders',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🎯</Text>
          ),
        }}
      />

      {/* Ratings */}
      <Drawer.Screen 
        name="Ratings" 
        component={Ratings}
        options={{
          title: 'Ratings & Reviews',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>⭐</Text>
          ),
        }}
      />

      {/* Settings */}
      <Drawer.Screen 
        name="Settings" 
        component={SettingsStack}
        options={{
          title: 'Settings',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>⚙️</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
