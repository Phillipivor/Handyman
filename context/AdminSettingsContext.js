import React, { createContext, useContext } from 'react';
import useAdminSettings from '../hooks/useAdminSettings';

const AdminSettingsContext = createContext(null);

export function AdminSettingsProvider({ children }) {
  const settings = useAdminSettings();

  return (
    <AdminSettingsContext.Provider value={settings}>
      {children}
    </AdminSettingsContext.Provider>
  );
}

export function useAdminSettingsContext() {
  const context = useContext(AdminSettingsContext);
  if (!context) {
    throw new Error('useAdminSettingsContext must be used within an AdminSettingsProvider');
  }
  return context;
}

// Export types for TypeScript support
export const AdminSettingsTypes = {
  // General Settings
  APP_SETTINGS: 'app',
  THEME_SETTINGS: 'theme',
  SITE_SETTINGS: 'site',
  LINK_SETTINGS: 'links',

  // Service Settings
  FEATURE_SETTINGS: 'features',
  APP_CONFIG: 'app',

  // Payment Settings
  CASH_ON_DELIVERY: 'cashOnDelivery',
  STRIPE: 'stripe',
  MOBILE_MONEY: 'mobileMoney',
  WALLET: 'wallet',
};

// Export validation schemas
export const ValidationSchemas = {
  general: {
    app: {
      name: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      phone: {
        required: true,
        pattern: /^\+?[\d\s-]+$/,
      },
      website: {
        required: true,
        pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
      },
    },
    theme: {
      primaryColor: {
        required: true,
        pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      },
      secondaryColor: {
        required: true,
        pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      },
      accentColor: {
        required: true,
        pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      },
    },
  },
  payment: {
    stripe: {
      stripeKey: {
        required: true,
        pattern: /^(sk|pk)_(test|live)_[A-Za-z0-9]+$/,
      },
      stripePublicKey: {
        required: true,
        pattern: /^(sk|pk)_(test|live)_[A-Za-z0-9]+$/,
      },
    },
    mobileMoney: {
      apiKey: {
        required: true,
        minLength: 32,
      },
      secretKey: {
        required: true,
        minLength: 32,
      },
    },
    wallet: {
      minimumBalance: {
        required: true,
        min: 0,
      },
      maximumBalance: {
        required: true,
        min: 1000,
      },
    },
  },
};

// Export utility functions
export const SettingsUtils = {
  // Validate settings based on schema
  validateSettings: (settings, schema) => {
    const errors = {};
    
    Object.entries(schema).forEach(([key, rules]) => {
      if (typeof rules === 'object' && !Array.isArray(rules)) {
        const nestedErrors = SettingsUtils.validateSettings(settings[key], rules);
        if (Object.keys(nestedErrors).length > 0) {
          errors[key] = nestedErrors;
        }
      } else {
        if (rules.required && !settings[key]) {
          errors[key] = 'This field is required';
        } else if (rules.pattern && !rules.pattern.test(settings[key])) {
          errors[key] = 'Invalid format';
        } else if (rules.minLength && settings[key].length < rules.minLength) {
          errors[key] = `Minimum length is ${rules.minLength}`;
        } else if (rules.maxLength && settings[key].length > rules.maxLength) {
          errors[key] = `Maximum length is ${rules.maxLength}`;
        } else if (rules.min !== undefined && Number(settings[key]) < rules.min) {
          errors[key] = `Minimum value is ${rules.min}`;
        }
      }
    });

    return errors;
  },

  // Format currency
  formatCurrency: (amount, currency = 'TZS') => {
    return `${amount.toLocaleString()} ${currency}`;
  },

  // Format date
  formatDate: (date, format = 'DD-MM-YYYY') => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();

    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year);
  },

  // Check if a feature is enabled
  isFeatureEnabled: (settings, feature) => {
    return settings.features?.[feature] || false;
  },

  // Check if a payment method is enabled
  isPaymentMethodEnabled: (settings, method) => {
    return settings[method]?.enabled || false;
  },

  // Get active payment methods
  getActivePaymentMethods: (settings) => {
    const methods = [];
    if (settings.cashOnDelivery?.enabled) methods.push('cashOnDelivery');
    if (settings.stripe?.enabled) methods.push('stripe');
    if (settings.mobileMoney?.enabled) methods.push('mobileMoney');
    if (settings.wallet?.enabled) methods.push('wallet');
    return methods;
  },

  // Get active mobile money providers
  getActiveMobileMoneyProviders: (settings) => {
    return settings.mobileMoney?.providers?.filter(p => p.enabled) || [];
  },
};
