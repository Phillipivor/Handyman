import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function JobStatus({ route }) {
  const navigation = useNavigation();
  const { assignment } = route.params;

  const [status, setStatus] = useState(assignment.status);
  const [progress, setProgress] = useState(assignment.progress);
  const [notes, setNotes] = useState('');
  const [materials, setMaterials] = useState([...assignment.materials]);
  const [newMaterial, setNewMaterial] = useState('');

  const statusOptions = [
    { id: 'pending', label: 'Pending', color: '#fbbf24' },
    { id: 'ongoing', label: 'In Progress', color: '#22c55e' },
    { id: 'completed', label: 'Completed', color: '#3b82f6' },
  ];

  const progressOptions = [0, 25, 50, 75, 100];

  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setMaterials([...materials, newMaterial.trim()]);
      setNewMaterial('');
    }
  };

  const handleRemoveMaterial = (index) => {
    const updatedMaterials = [...materials];
    updatedMaterials.splice(index, 1);
    setMaterials(updatedMaterials);
  };

  const handleUpdateStatus = () => {
    Alert.alert(
      'Update Job Status',
      'Are you sure you want to update the job status?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: () => {
            // TODO: Implement actual status update logic
            Alert.alert(
              'Success',
              'Job status has been updated successfully',
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
    <ScrollView style={styles.container}>
      {/* Job Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Details</Text>
        <View style={styles.jobInfo}>
          <Text style={styles.serviceTitle}>{assignment.service}</Text>
          <Text style={styles.price}>{assignment.price}</Text>
        </View>
        <Text style={styles.address}>{assignment.address}</Text>
        <Text style={styles.scheduledTime}>
          Scheduled for: {assignment.scheduledFor}
        </Text>
        <Text style={styles.description}>{assignment.description}</Text>
      </View>

      {/* Customer Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{assignment.customer.name}</Text>
          <View style={styles.customerMetrics}>
            <Text style={styles.customerRating}>⭐ {assignment.customer.rating}</Text>
            <Text style={styles.customerJobs}>
              {assignment.customer.totalJobs} jobs completed
            </Text>
          </View>
        </View>
      </View>

      {/* Status Update */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Update Status</Text>
        <View style={styles.statusOptions}>
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.statusButton,
                status === option.id && {
                  backgroundColor: option.color + '20',
                  borderColor: option.color,
                }
              ]}
              onPress={() => setStatus(option.id)}
            >
              <Text style={[
                styles.statusButtonText,
                status === option.id && { color: option.color }
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Progress Update */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Update Progress</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
        <View style={styles.progressOptions}>
          {progressOptions.map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.progressButton,
                progress === value && styles.progressButtonActive
              ]}
              onPress={() => setProgress(value)}
            >
              <Text style={[
                styles.progressButtonText,
                progress === value && styles.progressButtonTextActive
              ]}>
                {value}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Materials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Required Materials</Text>
        <View style={styles.materialsContainer}>
          {materials.map((material, index) => (
            <View key={index} style={styles.materialItem}>
              <Text style={styles.materialText}>{material}</Text>
              <TouchableOpacity
                style={styles.removeMaterialButton}
                onPress={() => handleRemoveMaterial(index)}
              >
                <Text style={styles.removeMaterialText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.addMaterialContainer}>
          <TextInput
            style={styles.materialInput}
            placeholder="Add new material"
            value={newMaterial}
            onChangeText={setNewMaterial}
          />
          <TouchableOpacity
            style={styles.addMaterialButton}
            onPress={handleAddMaterial}
          >
            <Text style={styles.addMaterialText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add any additional notes about the job"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => navigation.navigate('UploadImages', { 
            assignmentId: assignment.id 
          })}
        >
          <Text style={styles.uploadButtonText}>Upload Images</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateStatus}
        >
          <Text style={styles.updateButtonText}>Update Status</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginBottom: 15,
  },
  jobInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7c3aed',
  },
  address: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 5,
  },
  scheduledTime: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  customerInfo: {
    marginBottom: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 5,
  },
  customerMetrics: {
    flexDirection: 'row',
    gap: 15,
  },
  customerRating: {
    fontSize: 16,
    color: '#64748b',
  },
  customerJobs: {
    fontSize: 16,
    color: '#64748b',
  },
  statusOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7c3aed',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    color: '#64748b',
    minWidth: 50,
  },
  progressOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  progressButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  progressButtonActive: {
    backgroundColor: '#7c3aed',
  },
  progressButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  progressButtonTextActive: {
    color: '#fff',
  },
  materialsContainer: {
    marginBottom: 15,
  },
  materialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  materialText: {
    fontSize: 16,
    color: '#334155',
  },
  removeMaterialButton: {
    padding: 5,
  },
  removeMaterialText: {
    fontSize: 20,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  addMaterialContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  materialInput: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 8,
    fontSize: 16,
  },
  addMaterialButton: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addMaterialText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  notesInput: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    minHeight: 100,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    padding: 20,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#7c3aed',
    fontSize: 16,
    fontWeight: '600',
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
