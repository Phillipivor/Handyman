import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const { width } = useWindowDimensions();

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
  ];

  // Mock report data
  const revenueData = {
    total: '$12,458',
    change: '+15%',
    isPositive: true,
  };

  const serviceStats = [
    { title: 'Total Services', value: '245', change: '+12%', isPositive: true },
    { title: 'Completed Jobs', value: '189', change: '+8%', isPositive: true },
    { title: 'Cancelled Jobs', value: '12', change: '-3%', isPositive: false },
    { title: 'Average Rating', value: '4.8', change: '+0.2', isPositive: true },
  ];

  const topServices = [
    { name: 'Plumbing', bookings: 45, revenue: '$4,500' },
    { name: 'Electrical', bookings: 38, revenue: '$3,800' },
    { name: 'Carpentry', bookings: 32, revenue: '$3,200' },
    { name: 'Painting', bookings: 28, revenue: '$2,800' },
  ];

  const topHandymen = [
    { name: 'John Smith', jobs: 28, rating: 4.9, earnings: '$2,800' },
    { name: 'Mike Johnson', jobs: 25, rating: 4.8, earnings: '$2,500' },
    { name: 'Sarah Wilson', jobs: 22, rating: 4.9, earnings: '$2,200' },
    { name: 'David Brown', jobs: 20, rating: 4.7, earnings: '$2,000' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports & Analytics</Text>
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.id && styles.periodButtonTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.revenueCard}>
        <Text style={styles.cardTitle}>Total Revenue</Text>
        <View style={styles.revenueInfo}>
          <Text style={styles.revenueAmount}>{revenueData.total}</Text>
          <View style={[
            styles.changeIndicator,
            { backgroundColor: revenueData.isPositive ? '#dcfce7' : '#fee2e2' }
          ]}>
            <Text style={[
              styles.changeText,
              { color: revenueData.isPositive ? '#16a34a' : '#dc2626' }
            ]}>
              {revenueData.change}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        {serviceStats.map((stat, index) => (
          <View 
            key={index}
            style={[
              styles.statCard,
              { width: width > 768 ? '23%' : '48%' }
            ]}
          >
            <Text style={styles.statTitle}>{stat.title}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <View style={[
              styles.changeIndicator,
              { backgroundColor: stat.isPositive ? '#dcfce7' : '#fee2e2' }
            ]}>
              <Text style={[
                styles.changeText,
                { color: stat.isPositive ? '#16a34a' : '#dc2626' }
              ]}>
                {stat.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Services</Text>
        {topServices.map((service, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listItemMain}>
              <Text style={styles.listItemTitle}>{service.name}</Text>
              <Text style={styles.listItemSubtitle}>{service.bookings} bookings</Text>
            </View>
            <Text style={styles.listItemValue}>{service.revenue}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performing Handymen</Text>
        {topHandymen.map((handyman, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listItemMain}>
              <Text style={styles.listItemTitle}>{handyman.name}</Text>
              <Text style={styles.listItemSubtitle}>
                {handyman.jobs} jobs • {handyman.rating} ⭐
              </Text>
            </View>
            <Text style={styles.listItemValue}>{handyman.earnings}</Text>
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
    marginBottom: 15,
  },
  periodSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  periodButtonActive: {
    backgroundColor: '#0284c7',
  },
  periodButtonText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  revenueCard: {
    margin: 15,
    padding: 20,
    backgroundColor: '#fff',
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
  cardTitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 10,
  },
  revenueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  revenueAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
    gap: 10,
  },
  statCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
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
  statTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  changeIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    margin: 15,
    padding: 20,
    backgroundColor: '#fff',
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  listItemMain: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  listItemValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0284c7',
    marginLeft: 10,
  },
});
