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

export default function GeneralSettings() {
  // Mock settings data
  const [settings, setSettings] = useState({
    app: {
      name: 'Handyman Service App',
      description: 'Your trusted platform for professional handyman services',
      email: 'support@handymanapp.com',
      phone: '+255 123 456 789',
      website: 'www.handymanapp.com',
      address: '123 Main Street, Dar es Salaam, Tanzania',
    },
    theme: {
      primaryColor: '#2563eb',
      secondaryColor: '#1e293b',
      accentColor: '#f59e0b',
    },
    site: {
      dateFormat: 'DD-MM-YYYY',
      timeFormat: '24h',
      timezone: 'Africa/Dar_es_Salaam',
      language: 'English',
      currency: 'TZS',
      distanceUnit: 'km',
    },
    links: {
      androidUser: 'https://play.google.com/store/apps/user',
      androidProvider: 'https://play.google.com/store/apps/provider',
      androidHandyman: 'https://play.google.com/store/apps/handyman',
      iosUser: 'https://apps.apple.com/app/user',
      iosProvider: 'https://apps.apple.com/app/provider',
      iosHandyman: 'https://apps.apple.com/app/handyman',
    },
  });

  const handleSave = () => {
    // Implement save logic
  };

  return (
    <ScrollView style={styles.container}>
      {/* App Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>App Name</Text>
          <TextInput
            style={styles.input}
            value={settings.app.name}
            onChangeText={(text) => setSettings({
              ...settings,
              app: { ...settings.app, name: text }
            })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={settings.app.description}
            onChangeText={(text) => setSettings({
              ...settings,
              app: { ...settings.app, description: text }
            })}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Support Email</Text>
          <TextInput
            style={styles.input}
            value={settings.app.email}
            onChangeText={(text) => setSettings({
              ...settings,
              app: { ...settings.app, email: text }
            })}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Support Phone</Text>
          <TextInput
            style={styles.input}
            value={settings.app.phone}
            onChangeText={(text) => setSettings({
              ...settings,
              app: { ...settings.app, phone: text }
            })}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.input}
            value={settings.app.website}
            onChangeText={(text) => setSettings({
              ...settings,
              app: { ...settings.app, website: text }
            })}
            keyboardType="url"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={settings.app.address}
            onChangeText={(text) => setSettings({
              ...settings,
              app: { ...settings.app, address: text }
            })}
            multiline
            numberOfLines={2}
          />
        </View>
      </View>

      {/* Theme Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme Settings</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Primary Color</Text>
          <TouchableOpacity 
            style={[styles.colorPicker, { backgroundColor: settings.theme.primaryColor }]}
            onPress={() => {/* Show color picker */}}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Secondary Color</Text>
          <TouchableOpacity 
            style={[styles.colorPicker, { backgroundColor: settings.theme.secondaryColor }]}
            onPress={() => {/* Show color picker */}}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Accent Color</Text>
          <TouchableOpacity 
            style={[styles.colorPicker, { backgroundColor: settings.theme.accentColor }]}
            onPress={() => {/* Show color picker */}}
          />
        </View>
      </View>

      {/* Site Configuration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Site Configuration</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date Format</Text>
          <TouchableOpacity 
            style={styles.selector}
            onPress={() => {/* Show date format selector */}}
          >
            <Text style={styles.selectorText}>{settings.site.dateFormat}</Text>
            <Text style={styles.selectorIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Time Format</Text>
          <TouchableOpacity 
            style={styles.selector}
            onPress={() => {/* Show time format selector */}}
          >
            <Text style={styles.selectorText}>{settings.site.timeFormat}</Text>
            <Text style={styles.selectorIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Timezone</Text>
          <TouchableOpacity 
            style={styles.selector}
            onPress={() => {/* Show timezone selector */}}
          >
            <Text style={styles.selectorText}>{settings.site.timezone}</Text>
            <Text style={styles.selectorIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Language</Text>
          <TouchableOpacity 
            style={styles.selector}
            onPress={() => {/* Show language selector */}}
          >
            <Text style={styles.selectorText}>{settings.site.language}</Text>
            <Text style={styles.selectorIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Currency</Text>
          <TouchableOpacity 
            style={styles.selector}
            onPress={() => {/* Show currency selector */}}
          >
            <Text style={styles.selectorText}>{settings.site.currency}</Text>
            <Text style={styles.selectorIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Distance Unit</Text>
          <TouchableOpacity 
            style={styles.selector}
            onPress={() => {/* Show unit selector */}}
          >
            <Text style={styles.selectorText}>{settings.site.distanceUnit}</Text>
            <Text style={styles.selectorIcon}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* App Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Store Links</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Android User App</Text>
          <TextInput
            style={styles.input}
            value={settings.links.androidUser}
            onChangeText={(text) => setSettings({
              ...settings,
              links: { ...settings.links, androidUser: text }
            })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Android Provider App</Text>
          <TextInput
            style={styles.input}
            value={settings.links.androidProvider}
            onChangeText={(text) => setSettings({
              ...settings,
              links: { ...settings.links, androidProvider: text }
            })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Android Handyman App</Text>
          <TextInput
            style={styles.input}
            value={settings.links.androidHandyman}
            onChangeText={(text) => setSettings({
              ...settings,
              links: { ...settings.links, androidHandyman: text }
            })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>iOS User App</Text>
          <TextInput
            style={styles.input}
            value={settings.links.iosUser}
            onChangeText={(text) => setSettings({
              ...settings,
              links: { ...settings.links, iosUser: text }
            })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>iOS Provider App</Text>
          <TextInput
            style={styles.input}
            value={settings.links.iosProvider}
            onChangeText={(text) => setSettings({
              ...settings,
              links: { ...settings.links, iosProvider: text }
            })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>iOS Handyman App</Text>
          <TextInput
            style={styles.input}
            value={settings.links.iosHandyman}
            onChangeText={(text) => setSettings({
              ...settings,
              links: { ...settings.links, iosHandyman: text }
            })}
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Changes</Text>
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
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f1f5f9',
    padding: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 8,
    fontSize: 16,
    color: '#1e293b',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  colorPicker: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selector: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 16,
    color: '#1e293b',
  },
  selectorIcon: {
    fontSize: 12,
    color: '#64748b',
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
