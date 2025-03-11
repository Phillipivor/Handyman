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

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('providers'); // 'providers', 'handymen', 'customers'

  // Mock data for providers
  const providers = [
    {
      id: '1',
      name: 'ABC Services',
      email: 'abc@services.com',
      phone: '+255 123 456 789',
      status: 'active',
      totalServices: 45,
      rating: 4.8,
      earnings: '1,200,000 TZS',
    },
    {
      id: '2',
      name: 'XYZ Solutions',
      email: 'xyz@solutions.com',
      phone: '+255 987 654 321',
      status: 'pending',
      totalServices: 32,
      rating: 4.6,
      earnings: '980,000 TZS',
    },
  ];

  // Mock data for handymen
  const handymen = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+255 111 222 333',
      status: 'active',
      skills: ['Plumbing', 'Electrical'],
      completedJobs: 78,
      rating: 4.9,
    },
    {
      id: '2',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      phone: '+255 444 555 666',
      status: 'inactive',
      skills: ['Carpentry', 'Painting'],
      completedJobs: 45,
      rating: 4.7,
    },
  ];

  // Mock data for customers
  const customers = [
    {
      id: '1',
      name: 'Sarah Brown',
      email: 'sarah@example.com',
      phone: '+255 777 888 999',
      status: 'active',
      totalBookings: 12,
      totalSpent: '450,000 TZS',
      joinDate: '2023-12-01',
    },
    {
      id: '2',
      name: 'James Wilson',
      email: 'james@example.com',
      phone: '+255 666 777 888',
      status: 'active',
      totalBookings: 8,
      totalSpent: '320,000 TZS',
      joinDate: '2023-12-15',
    },
  ];

  const tabs = [
    { id: 'providers', label: 'Service Providers' },
    { id: 'handymen', label: 'Handymen' },
    { id: 'customers', label: 'Customers' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#dcfce7';
      case 'pending':
        return '#fef3c7';
      case 'inactive':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'active':
        return '#16a34a';
      case 'pending':
        return '#d97706';
      case 'inactive':
        return '#dc2626';
      default:
        return '#64748b';
    }
  };

  const renderProviders = () => (
    <ScrollView style={styles.contentContainer}>
      {providers.map((provider) => (
        <View key={provider.id} style={styles.userCard}>
          <View style={styles.userHeader}>
            <View>
              <Text style={styles.userName}>{provider.name}</Text>
              <Text style={styles.userContact}>{provider.email}</Text>
              <Text style={styles.userContact}>{provider.phone}</Text>
            </View>
            <Text style={[
              styles.statusBadge,
              { 
                backgroundColor: getStatusColor(provider.status),
                color: getStatusTextColor(provider.status),
              }
            ]}>
              {provider.status.toUpperCase()}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{provider.totalServices}</Text>
              <Text style={styles.statLabel}>Services</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>⭐ {provider.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{provider.earnings}</Text>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.viewButton]}
              onPress={() => {/* Navigate to details */}}
            >
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => {/* Show edit modal */}}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => {/* Show delete confirmation */}}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderHandymen = () => (
    <ScrollView style={styles.contentContainer}>
      {handymen.map((handyman) => (
        <View key={handyman.id} style={styles.userCard}>
          <View style={styles.userHeader}>
            <View>
              <Text style={styles.userName}>{handyman.name}</Text>
              <Text style={styles.userContact}>{handyman.email}</Text>
              <Text style={styles.userContact}>{handyman.phone}</Text>
            </View>
            <Text style={[
              styles.statusBadge,
              { 
                backgroundColor: getStatusColor(handyman.status),
                color: getStatusTextColor(handyman.status),
              }
            ]}>
              {handyman.status.toUpperCase()}
            </Text>
          </View>

          <View style={styles.skillsContainer}>
            {handyman.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{handyman.completedJobs}</Text>
              <Text style={styles.statLabel}>Jobs</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>⭐ {handyman.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.viewButton]}
              onPress={() => {/* Navigate to details */}}
            >
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => {/* Show edit modal */}}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => {/* Show delete confirmation */}}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderCustomers = () => (
    <ScrollView style={styles.contentContainer}>
      {customers.map((customer) => (
        <View key={customer.id} style={styles.userCard}>
          <View style={styles.userHeader}>
            <View>
              <Text style={styles.userName}>{customer.name}</Text>
              <Text style={styles.userContact}>{customer.email}</Text>
              <Text style={styles.userContact}>{customer.phone}</Text>
            </View>
            <Text style={[
              styles.statusBadge,
              { 
                backgroundColor: getStatusColor(customer.status),
                color: getStatusTextColor(customer.status),
              }
            ]}>
              {customer.status.toUpperCase()}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{customer.totalBookings}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{customer.totalSpent}</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{customer.joinDate}</Text>
              <Text style={styles.statLabel}>Joined</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.viewButton]}
              onPress={() => {/* Navigate to details */}}
            >
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => {/* Show edit modal */}}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => {/* Show delete confirmation */}}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      {activeTab === 'providers' && renderProviders()}
      {activeTab === 'handymen' && renderHandymen()}
      {activeTab === 'customers' && renderCustomers()}
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
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 10,
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
  contentContainer: {
    padding: 15,
  },
  userCard: {
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
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  userContact: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  skillBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 12,
    color: '#1e293b',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
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
  viewButton: {
    backgroundColor: '#2563eb',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#f1f5f9',
  },
  editButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
  },
  deleteButtonText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
});
