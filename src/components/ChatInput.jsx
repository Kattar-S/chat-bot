import React, { useState, useEffect } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, disabled, mode }) => {
  const [message, setMessage] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const toggleVoiceInput = () => {
    if (!isListening && 'webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else if (isListening) {
      // Stop listening logic would go here
      setIsListening(false);
    } else {
      alert('Voice recognition is not supported in your browser.');
    }
  };
  
  // Example queries based on chatbot mode
  useEffect(() => {
    const placeholders = {
      'rule-based': 'e.g., "What are the admission requirements?"',
      'nlp-based': 'e.g., "Tell me about scholarship opportunities"',
      'machine-learning-based': 'e.g., "How can I apply for financial aid?"'
    };
    
    setMessage(''); // Clear message when mode changes
    
    // Could set a placeholder based on mode
    document.getElementById('chat-input').placeholder = placeholders[mode] || 'Type your message...';
  }, [mode]);

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <input
        id="chat-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled || isListening}
        className={isListening ? 'listening' : ''}
      />
      <button 
        type="button" 
        className={`voice-button ${isListening ? 'listening' : ''}`}
        onClick={toggleVoiceInput}
      >
        {isListening ? '🔴' : '🎙️'}
      </button>
      <button type="submit" disabled={!message.trim() || disabled}>
        Send
      </button>
    </form>
  );
};

export default ChatInput;
