import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  Platform,
} from 'react-native';

export default function Sliders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSliders, setSelectedSliders] = useState([]);

  // Mock sliders data
  const sliders = [
    {
      id: '1',
      title: 'New Year Special Offer',
      description: 'Get 30% off on all cleaning services',
      image: 'https://example.com/slider1.jpg',
      link: '/services/cleaning',
      position: 1,
      status: true,
      validFrom: '2024-01-01',
      validTo: '2024-01-31',
    },
    {
      id: '2',
      title: 'Premium Handyman Services',
      description: 'Professional handymen at your service',
      image: 'https://example.com/slider2.jpg',
      link: '/services/handyman',
      position: 2,
      status: true,
      validFrom: '2024-01-15',
      validTo: '2024-02-15',
    },
  ];

  const handleSelectAll = () => {
    if (selectedSliders.length === sliders.length) {
      setSelectedSliders([]);
    } else {
      setSelectedSliders(sliders.map(slider => slider.id));
    }
  };

  const handleSelectSlider = (sliderId) => {
    if (selectedSliders.includes(sliderId)) {
      setSelectedSliders(selectedSliders.filter(id => id !== sliderId));
    } else {
      setSelectedSliders([...selectedSliders, sliderId]);
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
            placeholder="Search sliders..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {/* Show add slider modal */}}
        >
          <Text style={styles.addButtonText}>Add Slider</Text>
        </TouchableOpacity>
      </View>

      {/* Sliders List */}
      <ScrollView style={styles.listContainer}>
        {/* Select All Header */}
        <View style={styles.selectAllHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={handleSelectAll}
          >
            <Text style={styles.checkboxText}>
              {selectedSliders.length === sliders.length ? '✓' : ''}
            </Text>
          </TouchableOpacity>
          <Text style={styles.selectAllText}>Select All</Text>
          {selectedSliders.length > 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteSelected}
            >
              <Text style={styles.deleteButtonText}>
                Delete Selected ({selectedSliders.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Sliders */}
        {sliders.map((slider) => (
          <View key={slider.id} style={styles.sliderCard}>
            <View style={styles.sliderHeader}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => handleSelectSlider(slider.id)}
              >
                <Text style={styles.checkboxText}>
                  {selectedSliders.includes(slider.id) ? '✓' : ''}
                </Text>
              </TouchableOpacity>

              <View style={styles.sliderInfo}>
                <Text style={styles.sliderTitle}>{slider.title}</Text>
                <Text style={styles.sliderDescription}>{slider.description}</Text>
              </View>

              <Switch
                value={slider.status}
                onValueChange={() => {}}
                trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
                thumbColor={slider.status ? '#2563eb' : '#fff'}
              />
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: slider.image }}
                style={styles.sliderImage}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay}>
                <TouchableOpacity style={styles.changeImageButton}>
                  <Text style={styles.changeImageText}>Change Image</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sliderDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Link:</Text>
                <Text style={styles.detailValue}>{slider.link}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Position:</Text>
                <Text style={styles.detailValue}>{slider.position}</Text>
              </View>
            </View>

            <View style={styles.validityContainer}>
              <Text style={styles.validityText}>
                Valid: {slider.validFrom} to {slider.validTo}
              </Text>
              {isExpired(slider.validTo) && (
                <Text style={styles.expiredBadge}>EXPIRED</Text>
              )}
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.editButton]}
                onPress={() => {/* Show edit modal */}}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.previewButton]}
                onPress={() => {/* Show preview */}}
              >
                <Text style={styles.previewButtonText}>Preview</Text>
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
  sliderCard: {
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
  sliderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sliderInfo: {
    flex: 1,
    marginLeft: 10,
  },
  sliderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  sliderDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  imageContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  changeImageButton: {
    alignSelf: 'center',
  },
  changeImageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  sliderDetails: {
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
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
  previewButton: {
    backgroundColor: '#2563eb',
  },
  previewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
