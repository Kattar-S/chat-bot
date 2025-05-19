import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import useChatbot from '../hooks/useChatbot';
import './ChatInterface.css';

const ChatInterface = ({ mode }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the College Admission Assistant! How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { processMessage, isProcessing } = useChatbot(mode);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add mode change notification
    setMessages(prev => [
      ...prev,
      { 
        id: Date.now(), 
        text: `Switched to ${mode} mode. How can I assist you?`, 
        sender: 'bot', 
        timestamp: new Date() 
      }
    ]);
  }, [mode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = { 
      id: Date.now(), 
      text, 
      sender: 'user', 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Process message based on selected mode
      const response = await processMessage(text);
      
      // Add bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            id: Date.now(), 
            ...response, 
            sender: 'bot', 
            timestamp: new Date() 
          }
        ]);
        setIsTyping(false);
      }, 500 + Math.random() * 1000); // Simulate thinking time
      
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now(), 
          text: "Sorry, I encountered an error. Please try again.", 
          sender: 'bot', 
          timestamp: new Date() 
        }
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={isProcessing} 
        mode={mode}
      />
    </div>
  );
};

export default ChatInterface;
