import React, { useState } from 'react';
import '../styles/setting.css';

const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: '',
    siteLogo: '',
    currency: 'INR',
  });

  const [tourSettings, setTourSettings] = useState({
    defaultTourDuration: 7,
    maxGroupSize: 20,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    paymentMethod: 'Credit Card',
    currency: 'INR',
  });

  const [userProfileSettings, setUserProfileSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    });
  };

  const handleTourChange = (e) => {
    const { name, value } = e.target;
    setTourSettings({
      ...tourSettings,
      [name]: value,
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentSettings({
      ...paymentSettings,
      [name]: value,
    });
  };

  const handleUserProfileChange = (e) => {
    const { name, checked } = e.target;
    setUserProfileSettings({
      ...userProfileSettings,
      [name]: checked,
    });
  };

  const handleSaveSettings = () => {
    alert('Settings saved!');
  };

  return (
    <div className="tnt-settings-page">
      <h1>Tour and Travel Settings</h1>

      <div className="tnt-settings-section">
        <h2>General Settings</h2>
        <div className="tnt-form-group">
          <label>Site Name:</label>
          <input
            type="text"
            name="siteName"
            value={generalSettings.siteName}
            onChange={handleGeneralChange}
            placeholder="Enter site name"
          />
        </div>
        <div className="tnt-form-group">
          <label>Site Logo:</label>
          <input
            type="file"
            name="siteLogo"
            accept="image/*"
            onChange={(e) => setGeneralSettings({ ...generalSettings, siteLogo: e.target.files[0] })}
          />
        </div>
        <div className="tnt-form-group">
          <label>Currency:</label>
          <select
            name="currency"
            value={generalSettings.currency}
            onChange={handleGeneralChange}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      <div className="tnt-settings-section">
        <h2>Tour Settings</h2>
        <div className="tnt-form-group">
          <label>Default Tour Duration (Days):</label>
          <input
            type="number"
            name="defaultTourDuration"
            value={tourSettings.defaultTourDuration}
            onChange={handleTourChange}
          />
        </div>
        <div className="tnt-form-group">
          <label>Max Group Size:</label>
          <input
            type="number"
            name="maxGroupSize"
            value={tourSettings.maxGroupSize}
            onChange={handleTourChange}
          />
        </div>
      </div>

      <div className="tnt-settings-section">
        <h2>Payment Settings</h2>
        <div className="tnt-form-group">
          <label>Payment Method:</label>
          <select
            name="paymentMethod"
            value={paymentSettings.paymentMethod}
            onChange={handlePaymentChange}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <div className="tnt-form-group">
          <label>Currency:</label>
          <select
            name="currency"
            value={paymentSettings.currency}
            onChange={handlePaymentChange}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      <div className="tnt-settings-section">
        <h2>User Profile Settings</h2>
        <div className="tnt-form-group">
          <label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={userProfileSettings.emailNotifications}
              onChange={handleUserProfileChange}
            />
            Enable Email Notifications
          </label>
        </div>
        <div className="tnt-form-group">
          <label>
            <input
              type="checkbox"
              name="pushNotifications"
              checked={userProfileSettings.pushNotifications}
              onChange={handleUserProfileChange}
            />
            Enable Push Notifications
          </label>
        </div>
      </div>

      <div className="tnt-form-group">
        <button onClick={handleSaveSettings} className="tnt-save-settings-btn">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
