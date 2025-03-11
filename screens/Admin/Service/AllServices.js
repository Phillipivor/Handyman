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

export default function AllServices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedServices, setSelectedServices] = useState([]);

  // Mock services data
  const services = [
    {
      id: '1',
      name: 'Pipe Repair Service',
      provider: 'ABC Plumbing',
      category: 'Plumbing',
      price: '50,000 TZS',
      status: true,
    },
    {
      id: '2',
      name: 'Electrical Wiring',
      provider: 'XYZ Electric',
      category: 'Electrical',
      price: '75,000 TZS',
      status: true,
    },
    {
      id: '3',
      name: 'House Cleaning',
      provider: 'Clean Pro',
      category: 'Cleaning',
      price: '30,000 TZS',
      status: false,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Services' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  const handleSelectAll = () => {
    if (selectedServices.length === services.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(services.map(service => service.id));
    }
  };

  const handleSelectService = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleDeleteSelected = () => {
    // Implement delete logic
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'active' && service.status) ||
      (selectedFilter === 'inactive' && !service.status);
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header Actions */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {/* Show add service modal */}}
        >
          <Text style={styles.addButtonText}>Add Service</Text>
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

      {/* Services List */}
      <ScrollView style={styles.listContainer}>
        {/* Select All Header */}
        <View style={styles.selectAllHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={handleSelectAll}
          >
            <Text style={styles.checkboxText}>
              {selectedServices.length === services.length ? '✓' : ''}
            </Text>
          </TouchableOpacity>
          <Text style={styles.selectAllText}>Select All</Text>
          {selectedServices.length > 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteSelected}
            >
              <Text style={styles.deleteButtonText}>
                Delete Selected ({selectedServices.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Services Table */}
        <View style={styles.tableHeader}>
          <View style={styles.checkboxCell}>
            <Text></Text>
          </View>
          <Text style={[styles.headerCell, { flex: 3 }]}>Service</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Provider</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Category</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Price</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Action</Text>
        </View>

        {filteredServices.map((service) => (
          <View key={service.id} style={styles.tableRow}>
            <View style={styles.checkboxCell}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => handleSelectService(service.id)}
              >
                <Text style={styles.checkboxText}>
                  {selectedServices.includes(service.id) ? '✓' : ''}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.cell, { flex: 3 }]}>{service.name}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{service.provider}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{service.category}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{service.price}</Text>
            <View style={[styles.cell, { flex: 1 }]}>
              <Switch
                value={service.status}
                onValueChange={() => {}}
                trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                thumbColor={service.status ? '#2563eb' : '#fff'}
              />
            </View>
            <View style={[styles.cell, { flex: 1 }]}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {}}
              >
                <Text style={styles.actionButtonText}>⋮</Text>
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
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
  checkboxCell: {
    width: 40,
    alignItems: 'center',
  },
  cell: {
    fontSize: 14,
    color: '#1e293b',
  },
  actionButton: {
    padding: 8,
  },
  actionButtonText: {
    fontSize: 20,
    color: '#64748b',
  },
});
