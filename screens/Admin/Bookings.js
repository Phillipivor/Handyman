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

export default function Bookings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    service: '',
    dateRange: '',
    customer: '',
    provider: '',
    handyman: '',
    bookingStatus: '',
    paymentStatus: '',
    paymentType: '',
  });

  // Mock data for total amounts
  const totals = {
    total: '60,000 TZS',
    adminEarned: '12,000 TZS',
    providerEarned: '30,000 TZS',
    handymanEarned: '15,000 TZS',
    taxAmount: '2,000 TZS',
    discounts: '1,000 TZS',
  };

  // Mock data for bookings
  const bookings = [
    {
      id: 'SRV001',
      serviceType: 'Plumbing',
      bookingDate: '2024-01-20',
      user: 'John Doe',
      provider: 'ABC Services',
      status: 'completed',
      totalAmount: '20,000 TZS',
      paymentStatus: 'paid',
    },
    {
      id: 'SRV002',
      serviceType: 'Electrical',
      bookingDate: '2024-01-21',
      user: 'Jane Smith',
      provider: 'XYZ Electric',
      status: 'pending',
      totalAmount: '15,000 TZS',
      paymentStatus: 'pending',
    },
  ];

  const statusOptions = [
    'cancelled',
    'pending',
    'pending approval',
    'completed',
    'accepted',
    'ongoing',
    'in progress',
    'waiting',
    'failed',
    'rejected',
  ];

  const paymentStatusOptions = [
    'pending',
    'pending by admin',
    'paid',
    'advanced paid',
    'advance refunded',
  ];

  const paymentTypeOptions = [
    'cash',
    'stripe',
    'mobile payment',
    'wallet',
  ];

  const handleFilter = () => {
    // Implement filter logic
  };

  const handleReset = () => {
    setSelectedFilters({
      service: '',
      dateRange: '',
      customer: '',
      provider: '',
      handyman: '',
      bookingStatus: '',
      paymentStatus: '',
      paymentType: '',
    });
  };

  const handleExport = () => {
    // Implement export logic
  };

  const handleDeleteBooking = (id) => {
    // Implement delete logic
  };

  return (
    <ScrollView style={styles.container}>
      {/* Total Amount Section */}
      <View style={styles.totalSection}>
        <View style={styles.totalHeader}>
          <Text style={styles.totalAmount}>{totals.total}</Text>
          <TouchableOpacity style={styles.breakdownButton}>
            <Text style={styles.breakdownButtonText}>View Breakdown</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.breakdownGrid}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Admin Earned</Text>
            <Text style={styles.breakdownValue}>{totals.adminEarned}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Provider Earned</Text>
            <Text style={styles.breakdownValue}>{totals.providerEarned}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Handyman Earned</Text>
            <Text style={styles.breakdownValue}>{totals.handymanEarned}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Tax Amount</Text>
            <Text style={styles.breakdownValue}>{totals.taxAmount}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Discounts</Text>
            <Text style={styles.breakdownValue}>{totals.discounts}</Text>
          </View>
        </View>
      </View>

      {/* Search and Filter Section */}
      <View style={styles.filterSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search bookings..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {/* Show service picker */}}
            >
              <Text style={styles.filterButtonText}>
                {selectedFilters.service || 'Service'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {/* Show date picker */}}
            >
              <Text style={styles.filterButtonText}>
                {selectedFilters.dateRange || 'Date Range'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {/* Show customer picker */}}
            >
              <Text style={styles.filterButtonText}>
                {selectedFilters.customer || 'Customer'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {/* Show provider picker */}}
            >
              <Text style={styles.filterButtonText}>
                {selectedFilters.provider || 'Provider'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {/* Show status picker */}}
            >
              <Text style={styles.filterButtonText}>
                {selectedFilters.bookingStatus || 'Status'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {/* Show payment status picker */}}
            >
              <Text style={styles.filterButtonText}>
                {selectedFilters.paymentStatus || 'Payment Status'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {/* Show payment type picker */}}
            >
              <Text style={styles.filterButtonText}>
                {selectedFilters.paymentType || 'Payment Type'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.resetButton]}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.exportButton]}
            onPress={handleExport}
          >
            <Text style={styles.exportButtonText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bookings List */}
      <View style={styles.bookingsList}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 1 }]}>ID</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Service</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Date</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>User</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Provider</Text>
          <Text style={[styles.headerCell, { flex: 1.5 }]}>Status</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Amount</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Action</Text>
        </View>

        {/* Table Body */}
        {bookings.map((booking) => (
          <View key={booking.id} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 1 }]}>{booking.id}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{booking.serviceType}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{booking.bookingDate}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{booking.user}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{booking.provider}</Text>
            <View style={[styles.cell, { flex: 1.5 }]}>
              <Text style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(booking.status) }
              ]}>
                {booking.status.toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.cell, { flex: 2 }]}>{booking.totalAmount}</Text>
            <TouchableOpacity 
              style={[styles.cell, { flex: 1 }]}
              onPress={() => handleDeleteBooking(booking.id)}
            >
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>Page 1 of 5</Text>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return '#dcfce7';
    case 'pending':
      return '#fef3c7';
    case 'cancelled':
      return '#fee2e2';
    default:
      return '#f3f4f6';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  totalSection: {
    backgroundColor: '#fff',
    padding: 20,
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
  totalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  breakdownButton: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  breakdownButtonText: {
    color: '#4f46e5',
    fontSize: 14,
    fontWeight: '500',
  },
  breakdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  breakdownItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  filterSection: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterButtonText: {
    color: '#64748b',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#fee2e2',
  },
  resetButtonText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
  exportButton: {
    backgroundColor: '#0284c7',
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  bookingsList: {
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  cell: {
    fontSize: 14,
    color: '#1e293b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  deleteButton: {
    fontSize: 18,
    color: '#dc2626',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    gap: 15,
  },
  pageButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pageButtonText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  pageText: {
    color: '#1e293b',
    fontSize: 14,
  },
});
