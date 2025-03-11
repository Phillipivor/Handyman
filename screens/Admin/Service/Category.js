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

export default function Category() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock categories data
  const categories = [
    {
      id: '1',
      name: 'Plumbing',
      description: 'All plumbing related services',
      features: {
        isPopular: true,
        isUrgent: true,
        hasDiscount: false,
      },
      status: true,
    },
    {
      id: '2',
      name: 'Electrical',
      description: 'Electrical repair and installation services',
      features: {
        isPopular: true,
        isUrgent: true,
        hasDiscount: true,
      },
      status: true,
    },
    {
      id: '3',
      name: 'Cleaning',
      description: 'Home and office cleaning services',
      features: {
        isPopular: false,
        isUrgent: false,
        hasDiscount: true,
      },
      status: false,
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map(cat => cat.id));
    }
  };

  const handleSelectCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleDeleteSelected = () => {
    // Implement delete logic
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'active' && category.status) ||
      (selectedFilter === 'inactive' && !category.status);
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header Actions */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>Add Category</Text>
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

      {/* Categories List */}
      <ScrollView style={styles.listContainer}>
        {/* Select All Header */}
        <View style={styles.selectAllHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={handleSelectAll}
          >
            <Text style={styles.checkboxText}>
              {selectedCategories.length === categories.length ? '✓' : ''}
            </Text>
          </TouchableOpacity>
          <Text style={styles.selectAllText}>Select All</Text>
          {selectedCategories.length > 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteSelected}
            >
              <Text style={styles.deleteButtonText}>
                Delete Selected ({selectedCategories.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        {filteredCategories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => handleSelectCategory(category.id)}
              >
                <Text style={styles.checkboxText}>
                  {selectedCategories.includes(category.id) ? '✓' : ''}
                </Text>
              </TouchableOpacity>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>
                  {category.description}
                </Text>
              </View>
            </View>

            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>Popular</Text>
                <Switch
                  value={category.features.isPopular}
                  onValueChange={() => {}}
                  trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                  thumbColor={category.features.isPopular ? '#2563eb' : '#fff'}
                />
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>Urgent</Text>
                <Switch
                  value={category.features.isUrgent}
                  onValueChange={() => {}}
                  trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                  thumbColor={category.features.isUrgent ? '#2563eb' : '#fff'}
                />
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>Discount</Text>
                <Switch
                  value={category.features.hasDiscount}
                  onValueChange={() => {}}
                  trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                  thumbColor={category.features.hasDiscount ? '#2563eb' : '#fff'}
                />
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>Status</Text>
                <Switch
                  value={category.status}
                  onValueChange={() => {}}
                  trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                  thumbColor={category.status ? '#2563eb' : '#fff'}
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
  categoryCard: {
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
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
