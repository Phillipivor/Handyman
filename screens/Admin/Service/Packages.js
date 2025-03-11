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

export default function Packages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPackages, setSelectedPackages] = useState([]);

  // Mock packages data
  const packages = [
    {
      id: '1',
      name: 'Home Maintenance Bundle',
      description: 'Complete home maintenance package including plumbing, electrical, and cleaning services',
      services: [
        'Basic Plumbing Check',
        'Electrical Safety Inspection',
        'Deep Cleaning',
      ],
      price: '150,000 TZS',
      discountedPrice: '120,000 TZS',
      duration: '4 hours',
      status: true,
    },
    {
      id: '2',
      name: 'Premium Cleaning Package',
      description: 'Comprehensive cleaning service for homes and offices',
      services: [
        'Deep Cleaning',
        'Carpet Cleaning',
        'Window Cleaning',
      ],
      price: '100,000 TZS',
      discountedPrice: '85,000 TZS',
      duration: '3 hours',
      status: true,
    },
    {
      id: '3',
      name: 'Basic Repair Package',
      description: 'Essential repair services for common household issues',
      services: [
        'Basic Repairs',
        'Furniture Assembly',
        'Wall Mounting',
      ],
      price: '80,000 TZS',
      discountedPrice: '70,000 TZS',
      duration: '2 hours',
      status: false,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Packages' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  const handleSelectAll = () => {
    if (selectedPackages.length === packages.length) {
      setSelectedPackages([]);
    } else {
      setSelectedPackages(packages.map(pkg => pkg.id));
    }
  };

  const handleSelectPackage = (packageId) => {
    if (selectedPackages.includes(packageId)) {
      setSelectedPackages(selectedPackages.filter(id => id !== packageId));
    } else {
      setSelectedPackages([...selectedPackages, packageId]);
    }
  };

  const handleDeleteSelected = () => {
    // Implement delete logic
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = 
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'active' && pkg.status) ||
      (selectedFilter === 'inactive' && !pkg.status);
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header Actions */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search packages..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {/* Show add package modal */}}
        >
          <Text style={styles.addButtonText}>Add Package</Text>
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

      {/* Packages List */}
      <ScrollView style={styles.listContainer}>
        {/* Select All Header */}
        <View style={styles.selectAllHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={handleSelectAll}
          >
            <Text style={styles.checkboxText}>
              {selectedPackages.length === packages.length ? '✓' : ''}
            </Text>
          </TouchableOpacity>
          <Text style={styles.selectAllText}>Select All</Text>
          {selectedPackages.length > 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteSelected}
            >
              <Text style={styles.deleteButtonText}>
                Delete Selected ({selectedPackages.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Packages Cards */}
        {filteredPackages.map((pkg) => (
          <View key={pkg.id} style={styles.packageCard}>
            <View style={styles.packageHeader}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => handleSelectPackage(pkg.id)}
              >
                <Text style={styles.checkboxText}>
                  {selectedPackages.includes(pkg.id) ? '✓' : ''}
                </Text>
              </TouchableOpacity>
              <View style={styles.packageInfo}>
                <Text style={styles.packageName}>{pkg.name}</Text>
                <Text style={styles.packageDuration}>Duration: {pkg.duration}</Text>
              </View>
              <Switch
                value={pkg.status}
                onValueChange={() => {}}
                trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                thumbColor={pkg.status ? '#2563eb' : '#fff'}
              />
            </View>

            <Text style={styles.packageDescription}>{pkg.description}</Text>

            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>{pkg.price}</Text>
              <Text style={styles.discountedPrice}>{pkg.discountedPrice}</Text>
            </View>

            <View style={styles.servicesContainer}>
              <Text style={styles.servicesLabel}>Included Services:</Text>
              {pkg.services.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <Text style={styles.serviceText}>• {service}</Text>
                </View>
              ))}
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
                onPress={() => {/* Show details */}}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
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
  packageCard: {
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
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  packageInfo: {
    flex: 1,
    marginLeft: 10,
  },
  packageName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  packageDuration: {
    fontSize: 14,
    color: '#64748b',
  },
  packageDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  originalPrice: {
    fontSize: 16,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
  },
  servicesContainer: {
    marginBottom: 15,
  },
  servicesLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  serviceItem: {
    marginBottom: 4,
  },
  serviceText: {
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
