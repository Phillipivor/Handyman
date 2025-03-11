import { useState, useCallback } from 'react';

export default function useAdminSettings() {
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    app: {
      name: '',
      description: '',
      email: '',
      phone: '',
      website: '',
      address: '',
    },
    theme: {
      primaryColor: '',
      secondaryColor: '',
      accentColor: '',
    },
    site: {
      dateFormat: '',
      timeFormat: '',
      timezone: '',
      language: '',
      currency: '',
      distanceUnit: '',
    },
    links: {
      androidUser: '',
      androidProvider: '',
      androidHandyman: '',
      iosUser: '',
      iosProvider: '',
      iosHandyman: '',
    },
  });

  // Service settings state
  const [serviceSettings, setServiceSettings] = useState({
    features: {
      advancePayment: false,
      slotBooking: false,
      digitalServices: false,
      servicePackages: false,
      serviceAddons: false,
      postService: false,
      cancellationCharge: false,
    },
    app: {
      socialLogin: {
        enabled: false,
        google: false,
        apple: false,
        otp: false,
      },
      onlinePayment: false,
      blog: false,
      userWallet: false,
      forceUpdate: {
        user: false,
        provider: false,
        admin: false,
      },
      inAppPurchase: false,
      firebaseNotification: false,
      autoAssignProvider: false,
      whatsappNotification: false,
      smsNotification: false,
    },
  });

  // Payment settings state
  const [paymentSettings, setPaymentSettings] = useState({
    cashOnDelivery: {
      enabled: false,
      gatewayName: '',
    },
    stripe: {
      enabled: false,
      mode: 'test',
      gatewayName: '',
      stripeUrl: '',
      stripeKey: '',
      stripePublicKey: '',
    },
    mobileMoney: {
      enabled: false,
      providers: [
        {
          name: 'M-Pesa',
          enabled: false,
          apiKey: '',
          secretKey: '',
        },
        {
          name: 'Tigo Pesa',
          enabled: false,
          apiKey: '',
          secretKey: '',
        },
        {
          name: 'Airtel Money',
          enabled: false,
          apiKey: '',
          secretKey: '',
        },
      ],
    },
    wallet: {
      enabled: false,
      minimumBalance: '',
      maximumBalance: '',
    },
  });

  // Fetch settings
  const fetchSettings = useCallback(async () => {
    try {
      // Implement API calls to fetch settings
      // const response = await api.get('/settings');
      // setGeneralSettings(response.data.general);
      // setServiceSettings(response.data.service);
      // setPaymentSettings(response.data.payment);
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }, []);

  // Update general settings
  const updateGeneralSettings = useCallback(async (settings) => {
    try {
      // Implement API call to update general settings
      // await api.put('/settings/general', settings);
      setGeneralSettings(settings);
    } catch (error) {
      console.error('Error updating general settings:', error);
      throw error;
    }
  }, []);

  // Update service settings
  const updateServiceSettings = useCallback(async (settings) => {
    try {
      // Implement API call to update service settings
      // await api.put('/settings/service', settings);
      setServiceSettings(settings);
    } catch (error) {
      console.error('Error updating service settings:', error);
      throw error;
    }
  }, []);

  // Update payment settings
  const updatePaymentSettings = useCallback(async (settings) => {
    try {
      // Implement API call to update payment settings
      // await api.put('/settings/payment', settings);
      setPaymentSettings(settings);
    } catch (error) {
      console.error('Error updating payment settings:', error);
      throw error;
    }
  }, []);

  // Reset settings to defaults
  const resetSettings = useCallback(async () => {
    try {
      // Implement API call to reset settings
      // await api.post('/settings/reset');
      await fetchSettings();
    } catch (error) {
      console.error('Error resetting settings:', error);
      throw error;
    }
  }, [fetchSettings]);

  return {
    // Settings state
    generalSettings,
    serviceSettings,
    paymentSettings,

    // Actions
    fetchSettings,
    updateGeneralSettings,
    updateServiceSettings,
    updatePaymentSettings,
    resetSettings,
  };
}
