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

export default function Payment({ route }) {
  const navigation = useNavigation();
  const { service, selectedPackage, requestDetails } = route.params || {};

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [errors, setErrors] = useState({});

  // Mock service fee calculation
  const calculateFees = () => {
    const basePrice = parseInt(selectedPackage.price.replace(/[^0-9]/g, ''));
    const serviceFee = basePrice * 0.05;
    const tax = basePrice * 0.1;
    const total = basePrice + serviceFee + tax;

    return {
      basePrice,
      serviceFee,
      tax,
      total,
    };
  };

  const fees = calculateFees();

  const paymentMethods = [
    {
      id: 'card',
      label: 'Credit/Debit Card',
      icon: '💳',
    },
    {
      id: 'wallet',
      label: 'Digital Wallet',
      icon: '📱',
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!cardDetails.number.trim()) {
        newErrors.number = 'Card number is required';
      } else if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
        newErrors.number = 'Invalid card number';
      }

      if (!cardDetails.expiry.trim()) {
        newErrors.expiry = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        newErrors.expiry = 'Invalid expiry date (MM/YY)';
      }

      if (!cardDetails.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = 'Invalid CVV';
      }

      if (!cardDetails.name.trim()) {
        newErrors.name = 'Cardholder name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (validateForm()) {
      Alert.alert(
        'Confirm Payment',
        `Are you sure you want to proceed with the payment of $${fees.total}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Pay Now',
            onPress: () => {
              // TODO: Implement actual payment processing
              Alert.alert(
                'Payment Successful',
                'Your service request has been confirmed!',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home'),
                  },
                ]
              );
            },
          },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Order Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Payment Details</Text>
        <View style={styles.orderDetails}>
          <Text style={styles.serviceTitle}>{service?.title}</Text>
          <Text style={styles.packageName}>{selectedPackage?.name} Package</Text>
        </View>
      </View>

      {/* Payment Method Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethods}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodCard,
                paymentMethod === method.id && styles.paymentMethodSelected
              ]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
              <Text style={[
                styles.paymentMethodLabel,
                paymentMethod === method.id && styles.paymentMethodLabelSelected
              ]}>
                {method.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Card Details Form */}
      {paymentMethod === 'card' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Information</Text>
          <View style={styles.cardForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={[styles.input, errors.number && styles.inputError]}
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChangeText={(text) => {
                  setCardDetails({ ...cardDetails, number: text });
                  if (errors.number) setErrors({ ...errors, number: null });
                }}
                keyboardType="numeric"
                maxLength={19}
              />
              {errors.number && (
                <Text style={styles.errorText}>{errors.number}</Text>
              )}
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  style={[styles.input, errors.expiry && styles.inputError]}
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChangeText={(text) => {
                    setCardDetails({ ...cardDetails, expiry: text });
                    if (errors.expiry) setErrors({ ...errors, expiry: null });
                  }}
                  maxLength={5}
                />
                {errors.expiry && (
                  <Text style={styles.errorText}>{errors.expiry}</Text>
                )}
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={[styles.input, errors.cvv && styles.inputError]}
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChangeText={(text) => {
                    setCardDetails({ ...cardDetails, cvv: text });
                    if (errors.cvv) setErrors({ ...errors, cvv: null });
                  }}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
                {errors.cvv && (
                  <Text style={styles.errorText}>{errors.cvv}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cardholder Name</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="John Doe"
                value={cardDetails.name}
                onChangeText={(text) => {
                  setCardDetails({ ...cardDetails, name: text });
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
          </View>
        </View>
      )}

      {/* Price Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Breakdown</Text>
        <View style={styles.priceBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Base Price</Text>
            <Text style={styles.priceValue}>${fees.basePrice}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>${fees.serviceFee}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax</Text>
            <Text style={styles.priceValue}>${fees.tax}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${fees.total}</Text>
          </View>
        </View>
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePayment}
      >
        <Text style={styles.payButtonText}>Pay ${fees.total}</Text>
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
  orderDetails: {
    marginTop: 10,
  },
  serviceTitle: {
    fontSize: 18,
    color: '#334155',
    marginBottom: 5,
  },
  packageName: {
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 15,
  },
  paymentMethodCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  paymentMethodSelected: {
    borderColor: '#0284c7',
    backgroundColor: '#f0f9ff',
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  paymentMethodLabel: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  paymentMethodLabelSelected: {
    color: '#0284c7',
    fontWeight: '500',
  },
  cardForm: {
    gap: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#dc2626',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
  },
  priceBreakdown: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  priceValue: {
    fontSize: 16,
    color: '#1e293b',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0284c7',
  },
  payButton: {
    backgroundColor: '#0284c7',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
