const API_URL = 'http://localhost:3000';

export const sendNotification = async (token: string, title: string, body: string, data?: any) => {
  try {
    const response = await fetch(`${API_URL}/notifications/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        title,
        body,
        data,
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};