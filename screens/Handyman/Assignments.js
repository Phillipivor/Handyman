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

export default function Assignments() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ongoing');

  // Mock assignments data
  const assignments = [
    {
      id: '1',
      service: 'Plumbing Repair',
      customer: {
        name: 'John Doe',
        rating: 4.8,
        totalJobs: 12,
      },
      address: '123 Main St, City',
      scheduledFor: '2024-01-20 10:00 AM',
      status: 'ongoing',
      price: '$120',
      description: 'Leaking pipe under kitchen sink needs immediate repair',
      materials: ['Pipe wrench', 'Plumber\'s tape', 'Replacement pipe'],
      progress: 60,
    },
    {
      id: '2',
      service: 'Electrical Wiring',
      customer: {
        name: 'Jane Smith',
        rating: 4.9,
        totalJobs: 8,
      },
      address: '456 Oak Ave, City',
      scheduledFor: '2024-01-21 02:00 PM',
      status: 'pending',
      price: '$180',
      description: 'Install new electrical outlets in home office',
      materials: ['Wire stripper', 'Electrical tape', 'New outlets'],
      progress: 0,
    },
    {
      id: '3',
      service: 'Pipe Installation',
      customer: {
        name: 'Mike Wilson',
        rating: 4.7,
        totalJobs: 15,
      },
      address: '789 Pine Rd, City',
      scheduledFor: '2024-01-19 11:00 AM',
      status: 'completed',
      price: '$250',
      description: 'New bathroom pipe installation',
      materials: ['PVC pipes', 'Pipe cutter', 'PVC cement'],
      progress: 100,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Jobs' },
    { id: 'pending', label: 'Pending' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'completed', label: 'Completed' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#fbbf24';
      case 'ongoing':
        return '#22c55e';
      case 'completed':
        return '#3b82f6';
      default:
        return '#64748b';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = 
      assignment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || assignment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAssignmentPress = (assignment) => {
    navigation.navigate('JobStatus', { assignment });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Assignments</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search assignments..."
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

      {/* Assignments List */}
      <ScrollView style={styles.assignmentsList}>
        {filteredAssignments.map((assignment) => (
          <TouchableOpacity
            key={assignment.id}
            style={styles.assignmentCard}
            onPress={() => handleAssignmentPress(assignment)}
          >
            <View style={styles.assignmentHeader}>
              <View>
                <Text style={styles.serviceTitle}>{assignment.service}</Text>
                <Text style={styles.price}>{assignment.price}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(assignment.status) + '20' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(assignment.status) }
                ]}>
                  {assignment.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{assignment.customer.name}</Text>
              <View style={styles.customerMetrics}>
                <Text style={styles.customerRating}>⭐ {assignment.customer.rating}</Text>
                <Text style={styles.customerJobs}>
                  {assignment.customer.totalJobs} jobs
                </Text>
              </View>
            </View>

            <Text style={styles.address}>{assignment.address}</Text>
            <Text style={styles.scheduledTime}>
              Scheduled for: {assignment.scheduledFor}
            </Text>

            <Text style={styles.description} numberOfLines={2}>
              {assignment.description}
            </Text>

            {assignment.status !== 'pending' && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { width: `${assignment.progress}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{assignment.progress}%</Text>
              </View>
            )}

            <View style={styles.materialsContainer}>
              <Text style={styles.materialsTitle}>Required Materials:</Text>
              <View style={styles.materialsList}>
                {assignment.materials.map((material, index) => (
                  <View key={index} style={styles.materialItem}>
                    <Text style={styles.materialText}>• {material}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.chatButton}
                onPress={() => navigation.navigate('Chat', { 
                  customer: assignment.customer 
                })}
              >
                <Text style={styles.chatButtonText}>Chat with Customer</Text>
              </TouchableOpacity>

              {assignment.status === 'ongoing' && (
                <TouchableOpacity 
                  style={styles.uploadButton}
                  onPress={() => navigation.navigate('UploadImages', { 
                    assignmentId: assignment.id 
                  })}
                >
                  <Text style={styles.uploadButtonText}>Upload Images</Text>
                </TouchableOpacity>
              )}
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
    backgroundColor: '#7c3aed',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  assignmentsList: {
    padding: 15,
  },
  assignmentCard: {
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
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7c3aed',
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
  customerInfo: {
    marginBottom: 10,
  },
  customerName: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 4,
  },
  customerMetrics: {
    flexDirection: 'row',
    gap: 10,
  },
  customerRating: {
    fontSize: 14,
    color: '#64748b',
  },
  customerJobs: {
    fontSize: 14,
    color: '#64748b',
  },
  address: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  scheduledTime: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 15,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7c3aed',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    minWidth: 45,
  },
  materialsContainer: {
    marginBottom: 15,
  },
  materialsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  materialsList: {
    gap: 4,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialText: {
    fontSize: 14,
    color: '#64748b',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  chatButton: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#7c3aed',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#7c3aed',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
