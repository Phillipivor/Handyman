import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();

  // Mock data for dashboard statistics
  const statistics = {
    totalServices: '1,234',
    totalTaxes: '$5,678',
    myEarnings: '$12,345',
    totalRevenue: '$45,678',
  };

  // Mock data for recent lists
  const recentProviders = [
    { id: '1', name: 'John Smith', services: 45, rating: 4.8 },
    { id: '2', name: 'Sarah Wilson', services: 38, rating: 4.9 },
    { id: '3', name: 'Mike Johnson', services: 32, rating: 4.7 },
  ];

  const recentCustomers = [
    { id: '1', name: 'Alice Brown', bookings: 12, totalSpent: '$560' },
    { id: '2', name: 'Bob Wilson', bookings: 8, totalSpent: '$420' },
    { id: '3', name: 'Carol White', bookings: 5, totalSpent: '$280' },
  ];

  const recentBookings = [
    {
      id: '1',
      service: 'Plumbing Repair',
      customer: 'Alice Brown',
      amount: '$120',
      status: 'completed',
    },
    {
      id: '2',
      service: 'Electrical Work',
      customer: 'Bob Wilson',
      amount: '$180',
      status: 'pending',
    },
    {
      id: '3',
      service: 'House Cleaning',
      customer: 'Carol White',
      amount: '$90',
      status: 'in progress',
    },
  ];

  const renderStatCard = (title, value, color) => (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const renderRecentList = (title, data, viewAllScreen) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(viewAllScreen)}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {data.map((item) => (
        <View key={item.id} style={styles.listItem}>
          {title === 'Recent Providers' && (
            <>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetail}>Services: {item.services}</Text>
              <Text style={styles.itemDetail}>Rating: ⭐ {item.rating}</Text>
            </>
          )}
          {title === 'Recent Customers' && (
            <>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetail}>Bookings: {item.bookings}</Text>
              <Text style={styles.itemDetail}>Total Spent: {item.totalSpent}</Text>
            </>
          )}
          {title === 'Recent Bookings' && (
            <>
              <Text style={styles.itemName}>{item.service}</Text>
              <Text style={styles.itemDetail}>Customer: {item.customer}</Text>
              <View style={styles.bookingFooter}>
                <Text style={styles.itemAmount}>{item.amount}</Text>
                <Text style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) }
                ]}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </>
          )}
        </View>
      ))}
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#dcfce7';
      case 'pending':
        return '#fef3c7';
      case 'in progress':
        return '#dbeafe';
      default:
        return '#f3f4f6';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Statistics Section */}
      <View style={styles.statsContainer}>
        {renderStatCard('Total Services', statistics.totalServices, '#bfdbfe')}
        {renderStatCard('Total Taxes', statistics.totalTaxes, '#bbf7d0')}
        {renderStatCard('My Earnings', statistics.myEarnings, '#fde68a')}
        {renderStatCard('Total Revenue', statistics.totalRevenue, '#ddd6fe')}
      </View>

      {/* Charts Section */}
      <View style={styles.chartsSection}>
        <Text style={styles.sectionTitle}>Analytics</Text>
        {/* Add your charts here */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Charts Coming Soon</Text>
        </View>
      </View>

      {/* Recent Lists */}
      {renderRecentList('Recent Providers', recentProviders, 'ProviderList')}
      {renderRecentList('Recent Customers', recentCustomers, 'CustomerList')}
      {renderRecentList('Recent Bookings', recentBookings, 'Bookings')}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 15,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 20,
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
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    color: '#64748b',
  },
  chartsSection: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  viewAllText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  listItem: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 3,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0284c7',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
});
