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

export default function Addons() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Mock addons data
  const addons = [
    {
      id: '1',
      name: 'Emergency Service',
      price: '10,000 TZS',
      description: 'Priority response within 1 hour',
      status: true,
      services: ['Plumbing', 'Electrical'],
    },
    {
      id: '2',
      name: 'Extended Warranty',
      price: '15,000 TZS',
      description: 'Additional 6 months warranty',
      status: true,
      services: ['Appliance Repair', 'Electronics'],
    },
    {
      id: '3',
      name: 'Weekend Service',
      price: '8,000 TZS',
      description: 'Service available on weekends',
      status: false,
      services: ['Cleaning', 'Gardening'],
    },
  ];

  const filters = [
    { id: 'all', label: 'All Addons' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  const handleSelectAll = () => {
    if (selectedAddons.length === addons.length) {
      setSelectedAddons([]);
    } else {
      setSelectedAddons(addons.map(addon => addon.id));
    }
  };

  const handleSelectAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleDeleteSelected = () => {
    // Implement delete logic
  };

  const filteredAddons = addons.filter(addon => {
    const matchesSearch = 
      addon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'active' && addon.status) ||
      (selectedFilter === 'inactive' && !addon.status);
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header Actions */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search addons..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {/* Show add addon modal */}}
        >
          <Text style={styles.addButtonText}>Add Addon</Text>
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

      {/* Addons List */}
      <ScrollView style={styles.listContainer}>
        {/* Select All Header */}
        <View style={styles.selectAllHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={handleSelectAll}
          >
            <Text style={styles.checkboxText}>
              {selectedAddons.length === addons.length ? '✓' : ''}
            </Text>
          </TouchableOpacity>
          <Text style={styles.selectAllText}>Select All</Text>
          {selectedAddons.length > 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteSelected}
            >
              <Text style={styles.deleteButtonText}>
                Delete Selected ({selectedAddons.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Addons Cards */}
        {filteredAddons.map((addon) => (
          <View key={addon.id} style={styles.addonCard}>
            <View style={styles.addonHeader}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => handleSelectAddon(addon.id)}
              >
                <Text style={styles.checkboxText}>
                  {selectedAddons.includes(addon.id) ? '✓' : ''}
                </Text>
              </TouchableOpacity>
              <View style={styles.addonInfo}>
                <Text style={styles.addonName}>{addon.name}</Text>
                <Text style={styles.addonPrice}>{addon.price}</Text>
              </View>
              <Switch
                value={addon.status}
                onValueChange={() => {}}
                trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                thumbColor={addon.status ? '#2563eb' : '#fff'}
              />
            </View>

            <Text style={styles.addonDescription}>{addon.description}</Text>

            <View style={styles.servicesContainer}>
              <Text style={styles.servicesLabel}>Available for:</Text>
              <View style={styles.servicesTags}>
                {addon.services.map((service, index) => (
                  <View key={index} style={styles.serviceTag}>
                    <Text style={styles.serviceTagText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => {/* Show edit modal */}}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
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
  addonCard: {
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
  addonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addonInfo: {
    flex: 1,
    marginLeft: 10,
  },
  addonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  addonPrice: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  addonDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 15,
  },
  servicesContainer: {
    marginTop: 10,
  },
  servicesLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  servicesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  serviceTagText: {
    fontSize: 12,
    color: '#1e293b',
  },
  editButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
});
