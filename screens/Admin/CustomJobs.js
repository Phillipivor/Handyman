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

export default function CustomJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'services'

  // Mock data for job requests
  const jobRequests = [
    {
      id: '1',
      title: 'Custom Kitchen Renovation',
      customer: 'John Smith',
      price: '500,000 TZS',
      status: 'pending',
      date: '2024-01-20',
    },
    {
      id: '2',
      title: 'Garden Landscaping',
      customer: 'Sarah Wilson',
      price: '300,000 TZS',
      status: 'approved',
      date: '2024-01-21',
    },
  ];

  // Mock data for job services
  const jobServices = [
    {
      id: '1',
      name: 'Custom Renovation',
      user: 'Mike Johnson',
      category: 'Home Improvement',
      status: 'active',
    },
    {
      id: '2',
      name: 'Landscaping Design',
      user: 'Emma Davis',
      category: 'Outdoor',
      status: 'inactive',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#fef3c7';
      case 'approved':
        return '#dcfce7';
      case 'active':
        return '#dbeafe';
      case 'inactive':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'pending':
        return '#d97706';
      case 'approved':
        return '#16a34a';
      case 'active':
        return '#2563eb';
      case 'inactive':
        return '#dc2626';
      default:
        return '#64748b';
    }
  };

  const renderJobRequests = () => (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 3 }]}>Title</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Customer</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Price</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Status</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Action</Text>
      </View>

      <ScrollView>
        {jobRequests.map((request) => (
          <View key={request.id} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 3 }]}>{request.title}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{request.customer}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{request.price}</Text>
            <View style={[styles.cell, { flex: 2 }]}>
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
            <TouchableOpacity 
              style={[styles.cell, { flex: 1 }]}
              onPress={() => {/* Handle action */}}
            >
              <Text style={styles.actionButton}>⋮</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderJobServices = () => (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 3 }]}>Name</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>User</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Category</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Status</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Action</Text>
      </View>

      <ScrollView>
        {jobServices.map((service) => (
          <View key={service.id} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 3 }]}>{service.name}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{service.user}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{service.category}</Text>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text style={[
                styles.statusBadge,
                { 
                  backgroundColor: getStatusColor(service.status),
                  color: getStatusTextColor(service.status),
                }
              ]}>
                {service.status.toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.cell, { flex: 1 }]}
              onPress={() => {/* Handle action */}}
            >
              <Text style={styles.actionButton}>⋮</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${activeTab === 'requests' ? 'requests' : 'services'}...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'requests' && styles.activeTab
          ]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'requests' && styles.activeTabText
          ]}>
            Job Requests
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'services' && styles.activeTab
          ]}
          onPress={() => setActiveTab('services')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'services' && styles.activeTabText
          ]}>
            Job Services
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'requests' ? renderJobRequests() : renderJobServices()}
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
  tableContainer: {
    flex: 1,
    padding: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
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
    overflow: 'hidden',
  },
  actionButton: {
    fontSize: 20,
    color: '#64748b',
    textAlign: 'center',
  },
});
