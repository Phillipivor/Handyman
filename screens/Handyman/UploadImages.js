import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UploadImages({ route }) {
  const navigation = useNavigation();
  const { assignmentId } = route.params;

  const [images, setImages] = useState({
    before: [],
    after: [],
  });

  // Mock image data
  const mockImages = {
    before: [
      { id: '1', uri: 'https://example.com/before1.jpg' },
      { id: '2', uri: 'https://example.com/before2.jpg' },
    ],
    after: [
      { id: '1', uri: 'https://example.com/after1.jpg' },
    ],
  };

  const handleSelectImage = async (type) => {
    // TODO: Implement actual image picker logic
    Alert.alert(
      'Select Image',
      'Choose image source',
      [
        {
          text: 'Camera',
          onPress: () => console.log('Camera selected'),
        },
        {
          text: 'Gallery',
          onPress: () => console.log('Gallery selected'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleRemoveImage = (type, imageId) => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            const updatedImages = {
              ...images,
              [type]: images[type].filter(img => img.id !== imageId),
            };
            setImages(updatedImages);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleUpload = () => {
    // Validate images
    if (images.before.length === 0 && images.after.length === 0) {
      Alert.alert('Error', 'Please add at least one image');
      return;
    }

    Alert.alert(
      'Upload Images',
      'Are you sure you want to upload these images?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Upload',
          onPress: () => {
            // TODO: Implement actual upload logic
            Alert.alert(
              'Success',
              'Images uploaded successfully',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Before Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Before Images</Text>
          <Text style={styles.sectionDescription}>
            Take photos of the work area before starting the job
          </Text>

          <View style={styles.imageGrid}>
            {mockImages.before.map((image) => (
              <View key={image.id} style={styles.imageContainer}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>📷</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveImage('before', image.id)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addImageButton}
              onPress={() => handleSelectImage('before')}
            >
              <Text style={styles.addImageIcon}>+</Text>
              <Text style={styles.addImageText}>Add Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* After Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>After Images</Text>
          <Text style={styles.sectionDescription}>
            Take photos of the completed work
          </Text>

          <View style={styles.imageGrid}>
            {mockImages.after.map((image) => (
              <View key={image.id} style={styles.imageContainer}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>📷</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveImage('after', image.id)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addImageButton}
              onPress={() => handleSelectImage('after')}
            >
              <Text style={styles.addImageIcon}>+</Text>
              <Text style={styles.addImageText}>Add Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Guidelines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo Guidelines</Text>
          <View style={styles.guidelinesList}>
            <View style={styles.guidelineItem}>
              <Text style={styles.guidelineDot}>•</Text>
              <Text style={styles.guidelineText}>
                Take clear, well-lit photos of the work area
              </Text>
            </View>
            <View style={styles.guidelineItem}>
              <Text style={styles.guidelineDot}>•</Text>
              <Text style={styles.guidelineText}>
                Include multiple angles to show the complete scope of work
              </Text>
            </View>
            <View style={styles.guidelineItem}>
              <Text style={styles.guidelineDot}>•</Text>
              <Text style={styles.guidelineText}>
                Ensure the photos clearly show the problem and solution
              </Text>
            </View>
            <View style={styles.guidelineItem}>
              <Text style={styles.guidelineDot}>•</Text>
              <Text style={styles.guidelineText}>
                Avoid blurry or poorly framed photos
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Upload Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUpload}
        >
          <Text style={styles.uploadButtonText}>Upload Images</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageContainer: {
    width: (Platform.OS === 'web' ? 150 : '30%'),
    aspectRatio: 1,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  imagePlaceholderText: {
    fontSize: 32,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addImageButton: {
    width: (Platform.OS === 'web' ? 150 : '30%'),
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#7c3aed',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageIcon: {
    fontSize: 24,
    color: '#7c3aed',
    marginBottom: 4,
  },
  addImageText: {
    fontSize: 14,
    color: '#7c3aed',
    fontWeight: '500',
  },
  guidelinesList: {
    gap: 12,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  guidelineDot: {
    fontSize: 18,
    color: '#7c3aed',
    lineHeight: 24,
  },
  guidelineText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  uploadButton: {
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
