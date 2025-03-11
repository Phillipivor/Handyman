import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default function Payments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock payments data
  const payments = [
    {
      id: 'PAY001',
      bookingId: 'BK001',
      customer: 'John Smith',
      service: 'Plumbing Repair',
      amount: '50,000 TZS',
      paymentMethod: 'Mobile Money',
      status: 'completed',
      date: '2024-01-20',
    },
    {
      id: 'PAY002',
      bookingId: 'BK002',
      customer: 'Sarah Wilson',
      service: 'House Cleaning',
      amount: '35,000 TZS',
      paymentMethod: 'Cash',
      status: 'pending',
      date: '2024-01-21',
    },
    {
      id: 'PAY003',
      bookingId: 'BK003',
      customer: 'Mike Johnson',
      service: 'Electrical Work',
      amount: '75,000 TZS',
      paymentMethod: 'Stripe',
      status: 'failed',
      date: '2024-01-21',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Payments' },
    { id: 'completed', label: 'Completed' },
    { id: 'pending', label: 'Pending' },
    { id: 'failed', label: 'Failed' },
  ];

  const paymentMethods = [
    'All Methods',
    'Mobile Money',
    'Cash',
    'Stripe',
    'Wallet',
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#dcfce7';
      case 'pending':
        return '#fef3c7';
      case 'failed':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'completed':
        return '#16a34a';
      case 'pending':
        return '#d97706';
      case 'failed':
        return '#dc2626';
      default:
        return '#64748b';
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || payment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search payments..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.id && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedFilter === filter.id && styles.filterButtonTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Additional Filters */}
        <View style={styles.advancedFilters}>
          <View style={styles.dateRangeContainer}>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => {/* Show date picker */}}
            >
              <Text style={styles.dateInputText}>
                {dateRange.start || 'Start Date'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.dateRangeSeparator}>to</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => {/* Show date picker */}}
            >
              <Text style={styles.dateInputText}>
                {dateRange.end || 'End Date'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.methodSelector}
            onPress={() => {/* Show payment method selector */}}
          >
            <Text style={styles.methodSelectorText}>Payment Method</Text>
            <Text style={styles.methodSelectorIcon}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payments List */}
      <ScrollView style={styles.listContainer}>
        {filteredPayments.map((payment) => (
          <View key={payment.id} style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <View>
                <Text style={styles.paymentId}>Payment #{payment.id}</Text>
                <Text style={styles.bookingId}>Booking #{payment.bookingId}</Text>
              </View>
              <Text style={[
                styles.statusBadge,
                { 
                  backgroundColor: getStatusColor(payment.status),
                  color: getStatusTextColor(payment.status),
                }
              ]}>
                {payment.status.toUpperCase()}
              </Text>
            </View>

            <View style={styles.paymentDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Customer:</Text>
                <Text style={styles.detailValue}>{payment.customer}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Service:</Text>
                <Text style={styles.detailValue}>{payment.service}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount:</Text>
                <Text style={styles.detailValue}>{payment.amount}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Method:</Text>
                <Text style={styles.detailValue}>{payment.paymentMethod}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>{payment.date}</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.viewButton]}
                onPress={() => {/* Show payment details */}}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
              {payment.status === 'pending' && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.approveButton]}
                  onPress={() => {/* Approve payment */}}
                >
                  <Text style={styles.approveButtonText}>Approve</Text>
                </TouchableOpacity>
              )}
            </View>
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
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchInput: {
    backgroundColor: '#f1f5f9',
    padding: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 8,
    fontSize: 16,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  filtersScroll: {
    paddingHorizontal: 15,
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
  advancedFilters: {
    padding: 15,
    gap: 10,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 8,
  },
  dateInputText: {
    fontSize: 14,
    color: '#64748b',
  },
  dateRangeSeparator: {
    fontSize: 14,
    color: '#64748b',
  },
  methodSelector: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodSelectorText: {
    fontSize: 14,
    color: '#64748b',
  },
  methodSelectorIcon: {
    fontSize: 12,
    color: '#64748b',
  },
  listContainer: {
    flex: 1,
    padding: 15,
  },
  paymentCard: {
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
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  paymentId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 14,
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  paymentDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  detailValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#f1f5f9',
  },
  viewButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  approveButton: {
    backgroundColor: '#2563eb',
  },
  approveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
