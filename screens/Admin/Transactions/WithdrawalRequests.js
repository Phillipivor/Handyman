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

export default function WithdrawalRequests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('provider'); // 'provider' or 'handyman'
  const [selectedStatus, setSelectedStatus] = useState('pending');

  // Mock withdrawal requests data
  const withdrawalRequests = {
    provider: [
      {
        id: 'WR001',
        provider: 'ABC Services',
        amount: '250,000 TZS',
        requestDate: '2024-01-20',
        status: 'pending',
        paymentMethod: 'Bank Transfer',
        accountDetails: {
          bankName: 'CRDB Bank',
          accountNumber: '1234567890',
          accountName: 'ABC Services Ltd',
        },
      },
      {
        id: 'WR002',
        provider: 'XYZ Solutions',
        amount: '180,000 TZS',
        requestDate: '2024-01-21',
        status: 'approved',
        paymentMethod: 'Mobile Money',
        accountDetails: {
          provider: 'M-Pesa',
          number: '255123456789',
          name: 'John Doe',
        },
      },
    ],
    handyman: [
      {
        id: 'WR003',
        handyman: 'John Smith',
        amount: '120,000 TZS',
        requestDate: '2024-01-20',
        status: 'pending',
        paymentMethod: 'Mobile Money',
        accountDetails: {
          provider: 'Tigo Pesa',
          number: '255987654321',
          name: 'John Smith',
        },
      },
      {
        id: 'WR004',
        handyman: 'Mike Wilson',
        amount: '95,000 TZS',
        requestDate: '2024-01-21',
        status: 'rejected',
        paymentMethod: 'Bank Transfer',
        accountDetails: {
          bankName: 'NMB Bank',
          accountNumber: '0987654321',
          accountName: 'Mike Wilson',
        },
      },
    ],
  };

  const statusFilters = [
    { id: 'all', label: 'All Requests' },
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#dcfce7';
      case 'pending':
        return '#fef3c7';
      case 'rejected':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'approved':
        return '#16a34a';
      case 'pending':
        return '#d97706';
      case 'rejected':
        return '#dc2626';
      default:
        return '#64748b';
    }
  };

  const handleApprove = (requestId) => {
    // Implement approve logic
  };

  const handleReject = (requestId) => {
    // Implement reject logic
  };

  const renderWithdrawalRequest = (request) => (
    <View key={request.id} style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View>
          <Text style={styles.requestId}>Request #{request.id}</Text>
          <Text style={styles.userName}>
            {selectedTab === 'provider' ? request.provider : request.handyman}
          </Text>
        </View>
        <Text style={[
          styles.statusBadge,
          { 
            backgroundColor: getStatusColor(request.status),
            color: getStatusTextColor(request.status),
          }
        ]}>
          {request.status.toUpperCase()}
        </Text>
      </View>

      <View style={styles.requestDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.detailValue}>{request.amount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Request Date:</Text>
          <Text style={styles.detailValue}>{request.requestDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method:</Text>
          <Text style={styles.detailValue}>{request.paymentMethod}</Text>
        </View>
      </View>

      <View style={styles.accountDetails}>
        <Text style={styles.accountTitle}>Account Details</Text>
        {request.paymentMethod === 'Bank Transfer' ? (
          <>
            <Text style={styles.accountText}>Bank: {request.accountDetails.bankName}</Text>
            <Text style={styles.accountText}>Account: {request.accountDetails.accountNumber}</Text>
            <Text style={styles.accountText}>Name: {request.accountDetails.accountName}</Text>
          </>
        ) : (
          <>
            <Text style={styles.accountText}>Provider: {request.accountDetails.provider}</Text>
            <Text style={styles.accountText}>Number: {request.accountDetails.number}</Text>
            <Text style={styles.accountText}>Name: {request.accountDetails.name}</Text>
          </>
        )}
      </View>

      {request.status === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleApprove(request.id)}
          >
            <Text style={styles.approveButtonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleReject(request.id)}
          >
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search requests..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'provider' && styles.activeTab
          ]}
          onPress={() => setSelectedTab('provider')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'provider' && styles.activeTabText
          ]}>
            Provider Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'handyman' && styles.activeTab
          ]}
          onPress={() => setSelectedTab('handyman')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'handyman' && styles.activeTabText
          ]}>
            Handyman Requests
          </Text>
        </TouchableOpacity>
      </View>

      {/* Status Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {statusFilters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedStatus === filter.id && styles.filterButtonActive
            ]}
            onPress={() => setSelectedStatus(filter.id)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedStatus === filter.id && styles.filterButtonTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Requests List */}
      <ScrollView style={styles.listContainer}>
        {withdrawalRequests[selectedTab].map(renderWithdrawalRequest)}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    gap: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    color: '#fff',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
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
  listContainer: {
    flex: 1,
    padding: 15,
  },
  requestCard: {
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
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  requestId: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  requestDetails: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
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
  accountDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
    marginBottom: 15,
  },
  accountTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  accountText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#2563eb',
  },
  approveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  rejectButton: {
    backgroundColor: '#fee2e2',
  },
  rejectButtonText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
});
