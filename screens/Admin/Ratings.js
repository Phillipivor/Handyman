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

export default function Ratings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'handyman'
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock ratings data
  const ratings = {
    user: [
      {
        id: '1',
        user: 'John Smith',
        service: 'Plumbing Repair',
        provider: 'ABC Services',
        handyman: 'Mike Wilson',
        rating: 4.5,
        review: 'Great service, very professional and punctual.',
        date: '2024-01-20',
        status: 'published',
      },
      {
        id: '2',
        user: 'Sarah Brown',
        service: 'House Cleaning',
        provider: 'Clean Pro',
        handyman: 'Jane Davis',
        rating: 5,
        review: 'Excellent cleaning service, exceeded expectations!',
        date: '2024-01-21',
        status: 'pending',
      },
    ],
    handyman: [
      {
        id: '1',
        handyman: 'Mike Wilson',
        user: 'John Smith',
        service: 'Plumbing Repair',
        provider: 'ABC Services',
        rating: 4.8,
        review: 'Customer was cooperative and provided clear instructions.',
        date: '2024-01-20',
        status: 'published',
      },
      {
        id: '2',
        handyman: 'Jane Davis',
        user: 'Sarah Brown',
        service: 'House Cleaning',
        provider: 'Clean Pro',
        rating: 4.7,
        review: 'Pleasant customer, well-maintained house.',
        date: '2024-01-21',
        status: 'pending',
      },
    ],
  };

  const filters = [
    { id: 'all', label: 'All Reviews' },
    { id: 'published', label: 'Published' },
    { id: 'pending', label: 'Pending' },
    { id: 'rejected', label: 'Rejected' },
  ];

  const renderStars = (rating) => {
    const stars = '⭐'.repeat(Math.floor(rating));
    const halfStar = rating % 1 >= 0.5 ? '½' : '';
    return stars + halfStar;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
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
      case 'published':
        return '#16a34a';
      case 'pending':
        return '#d97706';
      case 'rejected':
        return '#dc2626';
      default:
        return '#64748b';
    }
  };

  const handleApprove = (ratingId) => {
    // Implement approve logic
  };

  const handleReject = (ratingId) => {
    // Implement reject logic
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search ratings..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'user' && styles.activeTab
          ]}
          onPress={() => setActiveTab('user')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'user' && styles.activeTabText
          ]}>
            User Reviews
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'handyman' && styles.activeTab
          ]}
          onPress={() => setActiveTab('handyman')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'handyman' && styles.activeTabText
          ]}>
            Handyman Reviews
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
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

      {/* Ratings List */}
      <ScrollView style={styles.listContainer}>
        {ratings[activeTab].map((rating) => (
          <View key={rating.id} style={styles.ratingCard}>
            <View style={styles.ratingHeader}>
              <View>
                <Text style={styles.userName}>
                  {activeTab === 'user' ? rating.user : rating.handyman}
                </Text>
                <Text style={styles.serviceText}>{rating.service}</Text>
              </View>
              <Text style={[
                styles.statusBadge,
                { 
                  backgroundColor: getStatusColor(rating.status),
                  color: getStatusTextColor(rating.status),
                }
              ]}>
                {rating.status.toUpperCase()}
              </Text>
            </View>

            <View style={styles.ratingDetails}>
              <Text style={styles.ratingStars}>{renderStars(rating.rating)}</Text>
              <Text style={styles.ratingValue}>{rating.rating.toFixed(1)}</Text>
            </View>

            <Text style={styles.reviewText}>{rating.review}</Text>

            <View style={styles.userDetails}>
              {activeTab === 'user' ? (
                <>
                  <Text style={styles.detailText}>Provider: {rating.provider}</Text>
                  <Text style={styles.detailText}>Handyman: {rating.handyman}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.detailText}>Customer: {rating.user}</Text>
                  <Text style={styles.detailText}>Provider: {rating.provider}</Text>
                </>
              )}
              <Text style={styles.dateText}>Date: {rating.date}</Text>
            </View>

            {rating.status === 'pending' && (
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.approveButton]}
                  onPress={() => handleApprove(rating.id)}
                >
                  <Text style={styles.approveButtonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.rejectButton]}
                  onPress={() => handleReject(rating.id)}
                >
                  <Text style={styles.rejectButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
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
  ratingCard: {
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
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  serviceText: {
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
  ratingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingStars: {
    fontSize: 16,
    marginRight: 8,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  reviewText: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 15,
    lineHeight: 20,
  },
  userDetails: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
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
