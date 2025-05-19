import { useState } from 'react';
import { sendMessage } from '../services/api';
import { processRuleBasedMessage } from '../services/chatbotService';

const useChatbot = (mode) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const processMessage = async (message) => {
    setIsProcessing(true);
    
    try {
      let response;
      
      // Based on the selected mode, process the message differently
      switch (mode) {
        case 'rule-based':
          // Process rule-based messages locally for better performance
          response = processRuleBasedMessage(message);
          break;
          
        case 'nlp-based':
        case 'machine-learning-based':
          // Send to backend API for more complex processing
          response = await sendMessage(message, mode);
          break;
          
        default:
          throw new Error(`Unknown chatbot mode: ${mode}`);
      }
      
      return response;
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    processMessage,
    isProcessing
  };
};

export default useChatbot;