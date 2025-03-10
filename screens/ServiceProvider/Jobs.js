import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Jobs() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock jobs data
  const jobs = [
    {
      id: '1',
      service: 'Plumbing Repair',
      customer: 'John Doe',
      address: '123 Main St, City',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'pending',
      price: '$120',
      urgency: 'normal',
      description: 'Leaking pipe under kitchen sink',
    },
    {
      id: '2',
      service: 'Pipe Installation',
      customer: 'Jane Smith',
      address: '456 Oak Ave, City',
      date: '2024-01-21',
      time: '02:00 PM',
      status: 'accepted',
      price: '$200',
      urgency: 'urgent',
      description: 'New pipe installation in bathroom',
    },
    {
      id: '3',
      service: 'Drain Cleaning',
      customer: 'Mike Johnson',
      address: '789 Pine Rd, City',
      date: '2024-01-22',
      time: '11:00 AM',
      status: 'completed',
      price: '$80',
      urgency: 'normal',
      description: 'Blocked drain in master bathroom',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Jobs' },
    { id: 'pending', label: 'Pending' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'completed', label: 'Completed' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#fbbf24';
      case 'accepted':
        return '#22c55e';
      case 'completed':
        return '#3b82f6';
      default:
        return '#64748b';
    }
  };

  const getUrgencyStyle = (urgency) => {
    return {
      backgroundColor: urgency === 'urgent' ? '#fee2e2' : '#f0fdf4',
      color: urgency === 'urgent' ? '#dc2626' : '#16a34a',
    };
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || job.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleJobPress = (job) => {
    // Navigate to job details screen
    navigation.navigate('JobDetails', { job });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Service Requests</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#64748b"
        />
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filters}
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

      {/* Jobs List */}
      <ScrollView style={styles.jobsList}>
        {filteredJobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={styles.jobCard}
            onPress={() => handleJobPress(job)}
          >
            <View style={styles.jobHeader}>
              <View>
                <Text style={styles.jobService}>{job.service}</Text>
                <Text style={styles.jobCustomer}>{job.customer}</Text>
              </View>
              <Text style={styles.jobPrice}>{job.price}</Text>
            </View>

            <View style={styles.jobDetails}>
              <Text style={styles.jobAddress}>{job.address}</Text>
              <View style={styles.jobSchedule}>
                <Text style={styles.jobDate}>{job.date}</Text>
                <Text style={styles.jobTime}>{job.time}</Text>
              </View>
            </View>

            <Text 
              numberOfLines={2} 
              style={styles.jobDescription}
            >
              {job.description}
            </Text>

            <View style={styles.jobFooter}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(job.status) + '20' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(job.status) }
                ]}>
                  {job.status.toUpperCase()}
                </Text>
              </View>

              <View style={[
                styles.urgencyBadge,
                { backgroundColor: getUrgencyStyle(job.urgency).backgroundColor }
              ]}>
                <Text style={[
                  styles.urgencyText,
                  { color: getUrgencyStyle(job.urgency).color }
                ]}>
                  {job.urgency.toUpperCase()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
  searchInput: {
    backgroundColor: '#f1f5f9',
    padding: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 8,
    fontSize: 16,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  filters: {
    padding: 15,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#0284c7',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  jobsList: {
    padding: 15,
  },
  jobCard: {
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
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  jobService: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  jobCustomer: {
    fontSize: 14,
    color: '#64748b',
  },
  jobPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0284c7',
  },
  jobDetails: {
    marginBottom: 10,
  },
  jobAddress: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 5,
  },
  jobSchedule: {
    flexDirection: 'row',
    gap: 10,
  },
  jobDate: {
    fontSize: 14,
    color: '#64748b',
  },
  jobTime: {
    fontSize: 14,
    color: '#64748b',
  },
  jobDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 15,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  urgencyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
