import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default function ServiceConfig() {
  // Mock service configuration data
  const [config, setConfig] = useState({
    features: {
      advancePayment: true,
      slotBooking: true,
      digitalServices: false,
      servicePackages: true,
      serviceAddons: true,
      postService: true,
      cancellationCharge: true,
    },
    app: {
      socialLogin: {
        enabled: true,
        google: true,
        apple: true,
        otp: true,
      },
      onlinePayment: true,
      blog: true,
      userWallet: true,
      forceUpdate: {
        user: false,
        provider: false,
        admin: false,
      },
      inAppPurchase: false,
      firebaseNotification: true,
      autoAssignProvider: true,
      whatsappNotification: true,
      smsNotification: true,
    },
  });

  const handleToggle = (section, feature, subFeature = null) => {
    if (subFeature) {
      setConfig({
        ...config,
        [section]: {
          ...config[section],
          [feature]: {
            ...config[section][feature],
            [subFeature]: !config[section][feature][subFeature],
          },
        },
      });
    } else {
      setConfig({
        ...config,
        [section]: {
          ...config[section],
          [feature]: !config[section][feature],
        },
      });
    }
  };

  const handleSave = () => {
    // Implement save logic
  };

  const renderSwitch = (label, value, onToggle) => (
    <View style={styles.switchItem}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#e2e8f0', true: '#bfdbfe' }}
        thumbColor={value ? '#2563eb' : '#fff'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Service Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Features</Text>
        {renderSwitch(
          'Advance Payment Service',
          config.features.advancePayment,
          () => handleToggle('features', 'advancePayment')
        )}
        {renderSwitch(
          'Slot Booking Service',
          config.features.slotBooking,
          () => handleToggle('features', 'slotBooking')
        )}
        {renderSwitch(
          'Digital Services',
          config.features.digitalServices,
          () => handleToggle('features', 'digitalServices')
        )}
        {renderSwitch(
          'Service Packages',
          config.features.servicePackages,
          () => handleToggle('features', 'servicePackages')
        )}
        {renderSwitch(
          'Service Add-ons',
          config.features.serviceAddons,
          () => handleToggle('features', 'serviceAddons')
        )}
        {renderSwitch(
          'Post Service',
          config.features.postService,
          () => handleToggle('features', 'postService')
        )}
        {renderSwitch(
          'Cancellation Charge',
          config.features.cancellationCharge,
          () => handleToggle('features', 'cancellationCharge')
        )}
      </View>

      {/* App Configuration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Configuration</Text>
        
        {/* Social Login */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Social Login</Text>
          {renderSwitch(
            'Enable Social Login',
            config.app.socialLogin.enabled,
            () => handleToggle('app', 'socialLogin', 'enabled')
          )}
          {config.app.socialLogin.enabled && (
            <>
              {renderSwitch(
                'Google Login',
                config.app.socialLogin.google,
                () => handleToggle('app', 'socialLogin', 'google')
              )}
              {renderSwitch(
                'Apple Login',
                config.app.socialLogin.apple,
                () => handleToggle('app', 'socialLogin', 'apple')
              )}
              {renderSwitch(
                'OTP Login',
                config.app.socialLogin.otp,
                () => handleToggle('app', 'socialLogin', 'otp')
              )}
            </>
          )}
        </View>

        {/* Force Update */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Force Update</Text>
          {renderSwitch(
            'User App',
            config.app.forceUpdate.user,
            () => handleToggle('app', 'forceUpdate', 'user')
          )}
          {renderSwitch(
            'Provider App',
            config.app.forceUpdate.provider,
            () => handleToggle('app', 'forceUpdate', 'provider')
          )}
          {renderSwitch(
            'Admin App',
            config.app.forceUpdate.admin,
            () => handleToggle('app', 'forceUpdate', 'admin')
          )}
        </View>

        {/* Other Features */}
        {renderSwitch(
          'Online Payment',
          config.app.onlinePayment,
          () => handleToggle('app', 'onlinePayment')
        )}
        {renderSwitch(
          'Blog',
          config.app.blog,
          () => handleToggle('app', 'blog')
        )}
        {renderSwitch(
          'User Wallet',
          config.app.userWallet,
          () => handleToggle('app', 'userWallet')
        )}
        {renderSwitch(
          'In-App Purchase',
          config.app.inAppPurchase,
          () => handleToggle('app', 'inAppPurchase')
        )}
        {renderSwitch(
          'Firebase Notification',
          config.app.firebaseNotification,
          () => handleToggle('app', 'firebaseNotification')
        )}
        {renderSwitch(
          'Auto Assign Provider',
          config.app.autoAssignProvider,
          () => handleToggle('app', 'autoAssignProvider')
        )}
        {renderSwitch(
          'WhatsApp Notification',
          config.app.whatsappNotification,
          () => handleToggle('app', 'whatsappNotification')
        )}
        {renderSwitch(
          'SMS Notification',
          config.app.smsNotification,
          () => handleToggle('app', 'smsNotification')
        )}
      </View>

      {/* Save Button */}
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Configuration</Text>
      </TouchableOpacity>
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
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  subsection: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 10,
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  switchLabel: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
