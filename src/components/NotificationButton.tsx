import React, { useState, useEffect } from 'react';
import { requestNotificationPermission } from '../services/firebase';

interface NotificationButtonProps {
  onTokenReceived: (token: string) => void;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ onTokenReceived }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [permissionState, setPermissionState] = useState<string | null>(null);

  useEffect(() => {
    setPermissionState(Notification.permission);
  }, []);

  const handleRequestPermission = async () => {
    setIsLoading(true);
    try {
      const token = await requestNotificationPermission();
      if (token) {
        onTokenReceived(token);
        setPermissionState('granted');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      setPermissionState('denied');
    }
    setIsLoading(false);
  };

  const getButtonText = () => {
    switch (permissionState) {
      case 'granted':
        return 'Notifications enabled';
      case 'denied':
        return 'Notifications blocked';
      case 'default':
        return 'Enable notifications';
      default:
        return 'Enable notifications';
    }
  };

  const isDisabled = permissionState === 'granted' || permissionState === 'denied' || isLoading;

  return (
    <button
      onClick={handleRequestPermission}
      disabled={isDisabled}
      style={{
        padding: '10px 20px',
        backgroundColor: permissionState === 'granted' ? '#4CAF50' : '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: isDisabled ? 'default' : 'pointer',
        opacity: isDisabled ? 0.7 : 1,
      }}
    >
      {isLoading ? 'Loading...' : getButtonText()}
    </button>
  );
};

export default NotificationButton;