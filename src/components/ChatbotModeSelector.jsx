import React from 'react';
import './ChatbotModeSelector.css';

const ChatbotModeSelector = ({ currentMode, onModeChange }) => {
  const modes = [
    { id: 'rule-based', label: 'Rule-Based', description: 'Simple keyword matching' },
    { id: 'nlp-based', label: 'NLP-Based', description: 'Natural language processing' },
    { id: 'machine-learning-based', label: 'ML-Based', description: 'Machine learning model' }
  ];

  return (
    <div className="mode-selector">
      <label htmlFor="mode-select">Chatbot Mode:</label>
      <div className="mode-options">
        {modes.map((mode) => (
          <div 
            key={mode.id}
            className={`mode-option ${currentMode === mode.id ? 'active' : ''}`}
            onClick={() => onModeChange(mode.id)}
          >
            <span className="mode-label">{mode.label}</span>
            <span className="mode-description">{mode.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotModeSelector;
