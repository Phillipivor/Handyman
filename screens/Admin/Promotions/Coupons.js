import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';

export default function Coupons() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCoupons, setSelectedCoupons] = useState([]);

  // Mock coupons data
  const coupons = [
    {
      id: '1',
      code: 'WELCOME50',
      description: '50% off on your first booking',
      discountType: 'percentage',
      discountValue: 50,
      minAmount: '10,000 TZS',
      maxDiscount: '25,000 TZS',
      validFrom: '2024-01-01',
      validTo: '2024-03-31',
      usageLimit: 100,
      usedCount: 45,
      status: true,
    },
    {
      id: '2',
      code: 'FLAT2000',
      description: 'Flat 2000 TZS off on any service',
      discountType: 'fixed',
      discountValue: 2000,
      minAmount: '5,000 TZS',
      maxDiscount: '2,000 TZS',
      validFrom: '2024-01-15',
      validTo: '2024-02-15',
      usageLimit: 200,
      usedCount: 78,
      status: true,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Coupons' },
    { id: 'active', label: 'Active' },
    { id: 'expired', label: 'Expired' },
  ];

  const handleSelectAll = () => {
    if (selectedCoupons.length === coupons.length) {
      setSelectedCoupons([]);
    } else {
      setSelectedCoupons(coupons.map(coupon => coupon.id));
    }
  };

  const handleSelectCoupon = (couponId) => {
    if (selectedCoupons.includes(couponId)) {
      setSelectedCoupons(selectedCoupons.filter(id => id !== couponId));
    } else {
      setSelectedCoupons([...selectedCoupons, couponId]);
    }
  };

  const handleDeleteSelected = () => {
    // Implement delete logic
  };

  const isExpired = (validTo) => {
    return new Date(validTo) < new Date();
  };

  return (
    <View style={styles.container}>
      {/* Header Actions */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search coupons..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {/* Show add coupon modal */}}
        >
          <Text style={styles.addButtonText}>Add Coupon</Text>
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

      {/* Coupons List */}
      <ScrollView style={styles.listContainer}>
        {/* Select All Header */}
        <View style={styles.selectAllHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={handleSelectAll}
          >
            <Text style={styles.checkboxText}>
              {selectedCoupons.length === coupons.length ? '✓' : ''}
            </Text>
          </TouchableOpacity>
          <Text style={styles.selectAllText}>Select All</Text>
          {selectedCoupons.length > 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteSelected}
            >
              <Text style={styles.deleteButtonText}>
                Delete Selected ({selectedCoupons.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Coupons */}
        {coupons.map((coupon) => (
          <View key={coupon.id} style={styles.couponCard}>
            <View style={styles.couponHeader}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => handleSelectCoupon(coupon.id)}
              >
                <Text style={styles.checkboxText}>
                  {selectedCoupons.includes(coupon.id) ? '✓' : ''}
                </Text>
              </TouchableOpacity>

              <View style={styles.couponInfo}>
                <Text style={styles.couponCode}>{coupon.code}</Text>
                <Text style={styles.couponDescription}>{coupon.description}</Text>
              </View>

              <Switch
                value={coupon.status}
                onValueChange={() => {}}
                trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                thumbColor={coupon.status ? '#2563eb' : '#fff'}
              />
            </View>

            <View style={styles.couponDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Discount:</Text>
                <Text style={styles.detailValue}>
                  {coupon.discountType === 'percentage' 
                    ? `${coupon.discountValue}%` 
                    : `${coupon.discountValue} TZS`}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Min Amount:</Text>
                <Text style={styles.detailValue}>{coupon.minAmount}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Max Discount:</Text>
                <Text style={styles.detailValue}>{coupon.maxDiscount}</Text>
              </View>
            </View>

            <View style={styles.validityContainer}>
              <View style={styles.validityDates}>
                <Text style={styles.validityText}>
                  Valid: {coupon.validFrom} to {coupon.validTo}
                </Text>
                {isExpired(coupon.validTo) && (
                  <Text style={styles.expiredBadge}>EXPIRED</Text>
                )}
              </View>
              <Text style={styles.usageText}>
                Used: {coupon.usedCount}/{coupon.usageLimit}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.editButton]}
                onPress={() => {/* Show edit modal */}}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.viewButton]}
                onPress={() => {/* Show usage details */}}
              >
                <Text style={styles.viewButtonText}>View Usage</Text>
              </TouchableOpacity>
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
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  selectAllHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#2563eb',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectAllText: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#dc2626',
    fontSize: 14,
  },
  couponCard: {
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
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  couponInfo: {
    flex: 1,
    marginLeft: 10,
  },
  couponCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  couponDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  couponDetails: {
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
  validityContainer: {
    marginBottom: 15,
  },
  validityDates: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  validityText: {
    fontSize: 14,
    color: '#64748b',
  },
  expiredBadge: {
    fontSize: 12,
    color: '#dc2626',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  usageText: {
    fontSize: 14,
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
  editButton: {
    backgroundColor: '#f1f5f9',
  },
  editButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#2563eb',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
