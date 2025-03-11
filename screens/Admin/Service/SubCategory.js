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

export default function SubCategory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  // Mock data for categories (parent categories)
  const categories = [
    { id: '1', name: 'Plumbing' },
    { id: '2', name: 'Electrical' },
    { id: '3', name: 'Cleaning' },
  ];

  // Mock data for subcategories
  const subCategories = [
    {
      id: '1',
      name: 'Pipe Repair',
      categoryId: '1',
      categoryName: 'Plumbing',
      featured: true,
      status: true,
    },
    {
      id: '2',
      name: 'Wiring Installation',
      categoryId: '2',
      categoryName: 'Electrical',
      featured: true,
      status: true,
    },
    {
      id: '3',
      name: 'Deep Cleaning',
      categoryId: '3',
      categoryName: 'Cleaning',
      featured: false,
      status: true,
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  const handleSelectAll = () => {
    if (selectedSubCategories.length === subCategories.length) {
      setSelectedSubCategories([]);
    } else {
      setSelectedSubCategories(subCategories.map(cat => cat.id));
    }
  };

  const handleSelectSubCategory = (subCategoryId) => {
    if (selectedSubCategories.includes(subCategoryId)) {
      setSelectedSubCategories(selectedSubCategories.filter(id => id !== subCategoryId));
    } else {
      setSelectedSubCategories([...selectedSubCategories, subCategoryId]);
    }
  };

  const handleDeleteSelected = () => {
    // Implement delete logic
  };

  const filteredSubCategories = subCategories.filter(subCategory => {
    const matchesSearch = 
      subCategory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subCategory.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'active' && subCategory.status) ||
      (selectedFilter === 'inactive' && !subCategory.status);
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header Actions */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search subcategories..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {/* Show add modal */}}
        >
          <Text style={styles.addButtonText}>Add Subcategory</Text>
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

      {/* SubCategories List */}
      <ScrollView style={styles.listContainer}>
        {/* Select All Header */}
        <View style={styles.selectAllHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={handleSelectAll}
          >
            <Text style={styles.checkboxText}>
              {selectedSubCategories.length === subCategories.length ? '✓' : ''}
            </Text>
          </TouchableOpacity>
          <Text style={styles.selectAllText}>Select All</Text>
          {selectedSubCategories.length > 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteSelected}
            >
              <Text style={styles.deleteButtonText}>
                Delete Selected ({selectedSubCategories.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* SubCategories */}
        {filteredSubCategories.map((subCategory) => (
          <View key={subCategory.id} style={styles.subCategoryCard}>
            <View style={styles.subCategoryHeader}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => handleSelectSubCategory(subCategory.id)}
              >
                <Text style={styles.checkboxText}>
                  {selectedSubCategories.includes(subCategory.id) ? '✓' : ''}
                </Text>
              </TouchableOpacity>
              <View style={styles.subCategoryInfo}>
                <Text style={styles.subCategoryName}>{subCategory.name}</Text>
                <Text style={styles.categoryName}>
                  Category: {subCategory.categoryName}
                </Text>
              </View>
            </View>

            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>Featured</Text>
                <Switch
                  value={subCategory.featured}
                  onValueChange={() => {}}
                  trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                  thumbColor={subCategory.featured ? '#2563eb' : '#fff'}
                />
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>Status</Text>
                <Switch
                  value={subCategory.status}
                  onValueChange={() => {}}
                  trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                  thumbColor={subCategory.status ? '#2563eb' : '#fff'}
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.deleteIconButton}
              onPress={() => {}}
            >
              <Text style={styles.deleteIcon}>🗑️</Text>
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
    marginRight: 10,
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
  subCategoryCard: {
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
  subCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  subCategoryInfo: {
    flex: 1,
  },
  subCategoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    color: '#64748b',
  },
  featuresContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  deleteIconButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  deleteIcon: {
    fontSize: 18,
    color: '#dc2626',
  },
});
