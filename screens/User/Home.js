import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();

  // Mock categories data
  const categories = [
    { id: '1', name: 'Plumbing', icon: '🔧', color: '#bfdbfe' },
    { id: '2', name: 'Electrical', icon: '⚡', color: '#fde68a' },
    { id: '3', name: 'Carpentry', icon: '🔨', color: '#fecaca' },
    { id: '4', name: 'Painting', icon: '🎨', color: '#bbf7d0' },
    { id: '5', name: 'Cleaning', icon: '🧹', color: '#ddd6fe' },
    { id: '6', name: 'Gardening', icon: '🌱', color: '#a7f3d0' },
  ];

  // Mock popular services data
  const popularServices = [
    {
      id: '1',
      title: 'Pipe Repair',
      category: 'Plumbing',
      rating: 4.8,
      reviews: 156,
      price: '$50/hr',
      image: 'https://example.com/plumbing.jpg',
    },
    {
      id: '2',
      title: 'Electrical Wiring',
      category: 'Electrical',
      rating: 4.9,
      reviews: 142,
      price: '$60/hr',
      image: 'https://example.com/electrical.jpg',
    },
    {
      id: '3',
      title: 'Furniture Assembly',
      category: 'Carpentry',
      rating: 4.7,
      reviews: 98,
      price: '$45/hr',
      image: 'https://example.com/carpentry.jpg',
    },
  ];

  // Mock featured handymen data
  const featuredHandymen = [
    {
      id: '1',
      name: 'John Smith',
      specialty: 'Plumbing Expert',
      rating: 4.9,
      jobs: 234,
      image: 'https://example.com/john.jpg',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      specialty: 'Electrical Specialist',
      rating: 4.8,
      jobs: 189,
      image: 'https://example.com/sarah.jpg',
    },
  ];

  const handleServicePress = (service) => {
    navigation.navigate('ServiceDetails', { service });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, User! 👋</Text>
        <Text style={styles.subtitle}>What service do you need today?</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#64748b"
        />
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                { backgroundColor: category.color },
                { width: width > 768 ? '15%' : '30%' }
              ]}
              onPress={() => navigation.navigate('ServiceDetails', { category })}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Popular Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesScroll}
        >
          {popularServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServicePress(service)}
            >
              <View style={styles.serviceImageContainer}>
                <View style={styles.servicePlaceholder}>
                  <Text style={styles.servicePlaceholderText}>
                    {service.category.charAt(0)}
                  </Text>
                </View>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceCategory}>{service.category}</Text>
                <View style={styles.serviceMetrics}>
                  <Text style={styles.serviceRating}>⭐ {service.rating}</Text>
                  <Text style={styles.serviceReviews}>({service.reviews})</Text>
                </View>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Handymen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Handymen</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.handymenScroll}
        >
          {featuredHandymen.map((handyman) => (
            <TouchableOpacity
              key={handyman.id}
              style={styles.handymanCard}
              onPress={() => navigation.navigate('HandymanProfile', { handyman })}
            >
              <View style={styles.handymanImageContainer}>
                <View style={styles.handymanPlaceholder}>
                  <Text style={styles.handymanPlaceholderText}>
                    {handyman.name.charAt(0)}
                  </Text>
                </View>
              </View>
              <View style={styles.handymanInfo}>
                <Text style={styles.handymanName}>{handyman.name}</Text>
                <Text style={styles.handymanSpecialty}>{handyman.specialty}</Text>
                <View style={styles.handymanMetrics}>
                  <Text style={styles.handymanRating}>⭐ {handyman.rating}</Text>
                  <Text style={styles.handymanJobs}>{handyman.jobs} jobs</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Action Button */}
      <TouchableOpacity
        style={styles.requestButton}
        onPress={() => navigation.navigate('RequestService')}
      >
        <Text style={styles.requestButtonText}>Request a Service</Text>
      </TouchableOpacity>
    </ScrollView>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  categoryCard: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
    textAlign: 'center',
  },
  servicesScroll: {
    paddingRight: 15,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 250,
    marginRight: 15,
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
  serviceImageContainer: {
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  servicePlaceholder: {
    backgroundColor: '#e2e8f0',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicePlaceholderText: {
    fontSize: 36,
    color: '#94a3b8',
  },
  serviceInfo: {
    padding: 15,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  serviceCategory: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  serviceMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceRating: {
    fontSize: 14,
    color: '#1e293b',
    marginRight: 5,
  },
  serviceReviews: {
    fontSize: 14,
    color: '#64748b',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0284c7',
  },
  handymenScroll: {
    paddingRight: 15,
  },
  handymanCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 200,
    marginRight: 15,
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
  handymanImageContainer: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  handymanPlaceholder: {
    backgroundColor: '#e2e8f0',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  handymanPlaceholderText: {
    fontSize: 36,
    color: '#94a3b8',
  },
  handymanInfo: {
    padding: 15,
  },
  handymanName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  handymanSpecialty: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  handymanMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  handymanRating: {
    fontSize: 14,
    color: '#1e293b',
  },
  handymanJobs: {
    fontSize: 14,
    color: '#64748b',
  },
  requestButton: {
    backgroundColor: '#0284c7',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
