import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ServiceDetails({ route }) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Mock service data
  const service = {
    id: '1',
    title: 'Professional Plumbing Service',
    category: 'Plumbing',
    rating: 4.8,
    reviews: 156,
    description: 'Expert plumbing services including pipe repair, installation, drain cleaning, and emergency repairs. Our certified plumbers ensure high-quality work with guaranteed satisfaction.',
    image: 'https://example.com/plumbing.jpg',
    packages: [
      {
        id: 'basic',
        name: 'Basic',
        price: '$50/hr',
        features: [
          'Basic plumbing inspection',
          'Minor repairs',
          'Up to 1 hour service',
        ],
      },
      {
        id: 'standard',
        name: 'Standard',
        price: '$120',
        features: [
          'Comprehensive inspection',
          'Major repairs',
          'Up to 3 hours service',
          'Parts included',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        price: '$200',
        features: [
          'Full system inspection',
          'Complex repairs',
          'Up to 5 hours service',
          'Parts included',
          'Priority scheduling',
          '30-day warranty',
        ],
      },
    ],
    features: [
      '24/7 Emergency Service',
      'Licensed & Insured Professionals',
      'Satisfaction Guaranteed',
      'Free Estimates',
      'Senior Citizen Discount',
    ],
  };

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      user: 'Jane Cooper',
      rating: 5,
      date: '2 days ago',
      comment: 'Excellent service! The plumber was professional and fixed our issue quickly.',
    },
    {
      id: '2',
      user: 'Robert Fox',
      rating: 4,
      date: '1 week ago',
      comment: 'Good service overall. Arrived on time and completed the job efficiently.',
    },
  ];

  const handleBookService = () => {
    if (!selectedPackage) {
      alert('Please select a package first');
      return;
    }
    navigation.navigate('RequestService', {
      service,
      selectedPackage,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Service Header */}
      <View style={styles.header}>
        <View style={styles.servicePlaceholder}>
          <Text style={styles.servicePlaceholderText}>
            {service.category.charAt(0)}
          </Text>
        </View>
      </View>

      {/* Service Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{service.title}</Text>
        <View style={styles.metrics}>
          <Text style={styles.category}>{service.category}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {service.rating}</Text>
            <Text style={styles.reviews}>({service.reviews} reviews)</Text>
          </View>
        </View>
        <Text style={styles.description}>{service.description}</Text>
      </View>

      {/* Service Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresList}>
          {service.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureText}>✓ {feature}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Service Packages */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Packages</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.packagesContainer}
        >
          {service.packages.map((pkg) => (
            <TouchableOpacity
              key={pkg.id}
              style={[
                styles.packageCard,
                selectedPackage?.id === pkg.id && styles.packageCardSelected
              ]}
              onPress={() => setSelectedPackage(pkg)}
            >
              <Text style={[
                styles.packageName,
                selectedPackage?.id === pkg.id && styles.packageNameSelected
              ]}>
                {pkg.name}
              </Text>
              <Text style={[
                styles.packagePrice,
                selectedPackage?.id === pkg.id && styles.packagePriceSelected
              ]}>
                {pkg.price}
              </Text>
              <View style={styles.packageFeatures}>
                {pkg.features.map((feature, index) => (
                  <Text 
                    key={index}
                    style={[
                      styles.packageFeatureText,
                      selectedPackage?.id === pkg.id && styles.packageFeatureTextSelected
                    ]}
                  >
                    • {feature}
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewUser}>{review.user}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <View style={styles.reviewRating}>
              {'⭐'.repeat(review.rating)}
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>

      {/* Book Service Button */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleBookService}
      >
        <Text style={styles.bookButtonText}>Book Service</Text>
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
    height: 250,
    backgroundColor: '#e2e8f0',
  },
  servicePlaceholder: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cbd5e1',
  },
  servicePlaceholderText: {
    fontSize: 48,
    color: '#94a3b8',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  category: {
    fontSize: 16,
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#1e293b',
    marginRight: 5,
  },
  reviews: {
    fontSize: 14,
    color: '#64748b',
  },
  description: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    color: '#334155',
  },
  packagesContainer: {
    paddingRight: 20,
    gap: 15,
  },
  packageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: 280,
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
  packageCardSelected: {
    borderColor: '#0284c7',
    backgroundColor: '#f0f9ff',
  },
  packageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  packageNameSelected: {
    color: '#0284c7',
  },
  packagePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0284c7',
    marginBottom: 15,
  },
  packagePriceSelected: {
    color: '#0284c7',
  },
  packageFeatures: {
    gap: 8,
  },
  packageFeatureText: {
    fontSize: 14,
    color: '#64748b',
  },
  packageFeatureTextSelected: {
    color: '#334155',
  },
  reviewCard: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  reviewDate: {
    fontSize: 14,
    color: '#64748b',
  },
  reviewRating: {
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: '#0284c7',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
