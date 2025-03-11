import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default function Earnings() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedType, setSelectedType] = useState('all');

  // Mock earnings data
  const earningsSummary = {
    total: '2,500,000 TZS',
    admin: '500,000 TZS',
    providers: '1,200,000 TZS',
    handymen: '800,000 TZS',
  };

  const earningsHistory = [
    {
      id: '1',
      date: '2024-01-20',
      bookingId: 'BK001',
      service: 'Plumbing Repair',
      provider: 'ABC Services',
      handyman: 'John Smith',
      amount: '75,000 TZS',
      breakdown: {
        admin: '15,000 TZS',
        provider: '35,000 TZS',
        handyman: '25,000 TZS',
      },
    },
    {
      id: '2',
      date: '2024-01-21',
      bookingId: 'BK002',
      service: 'House Cleaning',
      provider: 'Clean Pro',
      handyman: 'Mike Wilson',
      amount: '50,000 TZS',
      breakdown: {
        admin: '10,000 TZS',
        provider: '25,000 TZS',
        handyman: '15,000 TZS',
      },
    },
  ];

  const periods = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' },
  ];

  const types = [
    { id: 'all', label: 'All Earnings' },
    { id: 'admin', label: 'Admin' },
    { id: 'provider', label: 'Providers' },
    { id: 'handyman', label: 'Handymen' },
  ];

  return (
    <View style={styles.container}>
      {/* Summary Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.summaryContainer}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Earnings</Text>
          <Text style={styles.summaryValue}>{earningsSummary.total}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Admin Earnings</Text>
          <Text style={styles.summaryValue}>{earningsSummary.admin}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Provider Earnings</Text>
          <Text style={styles.summaryValue}>{earningsSummary.providers}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Handyman Earnings</Text>
          <Text style={styles.summaryValue}>{earningsSummary.handymen}</Text>
        </View>
      </ScrollView>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {/* Period Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.filterButton,
                selectedPeriod === period.id && styles.filterButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedPeriod === period.id && styles.filterButtonTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Type Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
        >
          {types.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.filterButton,
                selectedType === type.id && styles.filterButtonActive
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedType === type.id && styles.filterButtonTextActive
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Earnings History */}
      <ScrollView style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Earnings History</Text>
        {earningsHistory.map((earning) => (
          <View key={earning.id} style={styles.earningCard}>
            <View style={styles.earningHeader}>
              <View>
                <Text style={styles.earningDate}>{earning.date}</Text>
                <Text style={styles.bookingId}>Booking #{earning.bookingId}</Text>
              </View>
              <Text style={styles.earningAmount}>{earning.amount}</Text>
            </View>

            <View style={styles.serviceDetails}>
              <Text style={styles.serviceText}>{earning.service}</Text>
              <View style={styles.userInfo}>
                <Text style={styles.userText}>Provider: {earning.provider}</Text>
                <Text style={styles.userText}>Handyman: {earning.handyman}</Text>
              </View>
            </View>

            <View style={styles.breakdownContainer}>
              <Text style={styles.breakdownTitle}>Earnings Breakdown</Text>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Admin:</Text>
                <Text style={styles.breakdownValue}>{earning.breakdown.admin}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Provider:</Text>
                <Text style={styles.breakdownValue}>{earning.breakdown.provider}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Handyman:</Text>
                <Text style={styles.breakdownValue}>{earning.breakdown.handyman}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => {/* Navigate to details */}}
            >
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  summaryContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  summaryCard: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    minWidth: 150,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  filterRow: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748b',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  historyContainer: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  earningCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
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
  earningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  earningDate: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 14,
    color: '#64748b',
  },
  earningAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  serviceDetails: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  serviceText: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 8,
  },
  userInfo: {
    gap: 4,
  },
  userText: {
    fontSize: 14,
    color: '#64748b',
  },
  breakdownContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
    marginBottom: 15,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  breakdownValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
});
