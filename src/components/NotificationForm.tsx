import React, { useState } from 'react';
import { sendNotification } from '../utils/api';

interface NotificationFormProps {
  fcmToken: string | null;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ fcmToken }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fcmToken) {
      setResult({
        error: true,
        message: 'No FCM token available. Please enable notifications first.',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await sendNotification(fcmToken, title, body);
      setResult({
        error: false,
        message: 'Notification sent successfully!',
        data: response,
      });
      // Clear form
      setTitle('');
      setBody('');
    } catch (error) {
      setResult({
        error: true,
        message: 'Failed to send notification.',
        data: error,
      });
    }
    setIsLoading(false);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Send Test Notification</h2>
      {fcmToken ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="body" style={{ display: 'block', marginBottom: '5px' }}>
              Message:
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={4}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'default' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Sending...' : 'Send Notification'}
          </button>
          {result && (
            <div
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: result.error ? '#ffebee' : '#e8f5e9',
                borderRadius: '4px',
                color: result.error ? '#c62828' : '#2e7d32',
              }}
            >
              <p>{result.message}</p>
              {result.data && <pre>{JSON.stringify(result.data, null, 2)}</pre>}
            </div>
          )}
        </form>
      ) : (
        <p>Please enable notifications to send test messages.</p>
      )}
    </div>
  );
};

export default NotificationForm;