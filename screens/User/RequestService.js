import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RequestService({ route }) {
  const navigation = useNavigation();
  const { service, selectedPackage } = route.params || {};

  const [formData, setFormData] = useState({
    address: '',
    date: '',
    time: '',
    description: '',
    urgency: 'normal', // normal, urgent
  });

  const [errors, setErrors] = useState({});

  const urgencyOptions = [
    { id: 'normal', label: 'Normal', color: '#0284c7' },
    { id: 'urgent', label: 'Urgent', color: '#dc2626' },
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Confirm Request',
        'Are you sure you want to submit this service request?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Submit',
            onPress: () => {
              // TODO: Implement actual submission logic
              navigation.navigate('Payment', {
                service,
                selectedPackage,
                requestDetails: formData,
              });
            },
          },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Service Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Service Request</Text>
        {service && (
          <>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            {selectedPackage && (
              <View style={styles.packageInfo}>
                <Text style={styles.packageName}>{selectedPackage.name} Package</Text>
                <Text style={styles.packagePrice}>{selectedPackage.price}</Text>
              </View>
            )}
          </>
        )}
      </View>

      {/* Request Form */}
      <View style={styles.formContainer}>
        {/* Address Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Address</Text>
          <TextInput
            style={[styles.input, errors.address && styles.inputError]}
            placeholder="Enter your address"
            value={formData.address}
            onChangeText={(text) => {
              setFormData({ ...formData, address: text });
              if (errors.address) {
                setErrors({ ...errors, address: null });
              }
            }}
            multiline
          />
          {errors.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}
        </View>

        {/* Date Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preferred Date</Text>
          <TextInput
            style={[styles.input, errors.date && styles.inputError]}
            placeholder="Select date"
            value={formData.date}
            onChangeText={(text) => {
              setFormData({ ...formData, date: text });
              if (errors.date) {
                setErrors({ ...errors, date: null });
              }
            }}
          />
          {errors.date && (
            <Text style={styles.errorText}>{errors.date}</Text>
          )}
        </View>

        {/* Time Slots */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preferred Time</Text>
          <View style={styles.timeSlotContainer}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  formData.time === time && styles.timeSlotSelected
                ]}
                onPress={() => setFormData({ ...formData, time })}
              >
                <Text style={[
                  styles.timeSlotText,
                  formData.time === time && styles.timeSlotTextSelected
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.time && (
            <Text style={styles.errorText}>{errors.time}</Text>
          )}
        </View>

        {/* Urgency Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Urgency</Text>
          <View style={styles.urgencyContainer}>
            {urgencyOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.urgencyOption,
                  formData.urgency === option.id && {
                    backgroundColor: option.color + '10',
                    borderColor: option.color,
                  }
                ]}
                onPress={() => setFormData({ ...formData, urgency: option.id })}
              >
                <Text style={[
                  styles.urgencyText,
                  formData.urgency === option.id && { color: option.color }
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Problem Description</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.description && styles.inputError
            ]}
            placeholder="Describe your problem in detail"
            value={formData.description}
            onChangeText={(text) => {
              setFormData({ ...formData, description: text });
              if (errors.description) {
                setErrors({ ...errors, description: null });
              }
            }}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Continue to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 18,
    color: '#334155',
    marginBottom: 5,
  },
  packageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageName: {
    fontSize: 16,
    color: '#64748b',
  },
  packagePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0284c7',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
    color: '#1e293b',
  },
  inputError: {
    borderColor: '#dc2626',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    marginTop: 4,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginBottom: 8,
  },
  timeSlotSelected: {
    backgroundColor: '#0284c7',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#64748b',
  },
  timeSlotTextSelected: {
    color: '#fff',
  },
  urgencyContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  urgencyOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  urgencyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  submitButton: {
    backgroundColor: '#0284c7',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
