import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const { width } = useWindowDimensions();

  // Mock statistics data
  const stats = [
    { title: 'Total Users', value: '1,234', color: '#3b82f6' },
    { title: 'Active Handymen', value: '89', color: '#10b981' },
    { title: 'Pending Jobs', value: '45', color: '#f59e0b' },
    { title: 'Completed Jobs', value: '756', color: '#6366f1' },
  ];

  const menuItems = [
    {
      title: 'Manage Users',
      icon: '👥',
      onPress: () => navigation.navigate('ManageUsers'),
      color: '#bfdbfe',
    },
    {
      title: 'Reports',
      icon: '📊',
      onPress: () => navigation.navigate('Reports'),
      color: '#bbf7d0',
    },
    {
      title: 'Settings',
      icon: '⚙️',
      onPress: () => navigation.navigate('Settings'),
      color: '#fef3c7',
    },
    {
      title: 'Logout',
      icon: '🚪',
      onPress: logout,
      color: '#fecaca',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back, Admin!</Text>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View 
            key={index}
            style={[
              styles.statCard,
              { backgroundColor: stat.color + '10' },
              { width: width > 768 ? '23%' : '48%' }
            ]}
          >
            <Text style={[styles.statValue, { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              { backgroundColor: item.color },
              { width: width > 768 ? '23%' : '48%' }
            ]}
            onPress={item.onPress}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.recentActivityContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.activityItem}>
            <Text style={styles.activityText}>
              New handyman registration approved
            </Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
    gap: 10,
  },
  statCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    color: '#64748b',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
    gap: 10,
  },
  menuItem: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  menuIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  recentActivityContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  activityText: {
    fontSize: 14,
    color: '#334155',
    flex: 1,
  },
  activityTime: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 10,
  },
});
