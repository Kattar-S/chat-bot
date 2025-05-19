const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const sendMessage = async (message, mode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        mode
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return {
      text: "I'm having trouble connecting to my knowledge base. Please try again later.",
      error: true
    };
  }
};

