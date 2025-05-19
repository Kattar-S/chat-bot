import React from 'react';
import TableResponse from './RichResponses/TableResponse';
import ListResponse from './RichResponses/ListResponse';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const { sender, text, timestamp, components, suggestions } = message;
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const renderComponent = (component) => {
    switch (component.type) {
      case 'table':
        return <TableResponse key={component.id || Math.random()} data={component} />;
      case 'ordered-list':
      case 'unordered-list':
        return <ListResponse key={component.id || Math.random()} data={component} />;
      default:
        return null;
    }
  };

  return (
    <div className={`chat-message ${sender === 'user' ? 'user' : 'bot'}`}>
      <div className="message-content">
        <div className="message-text">{text}</div>
        
        {components && components.map(component => renderComponent(component))}
        
        {suggestions && suggestions.length > 0 && (
          <div className="message-suggestions">
            {suggestions.map((suggestion, index) => (
              <button key={index} className="suggestion-chip">
                {suggestion}
              </button>
            ))}
          </div>
        )}
        
        <div className="message-timestamp">{formatTime(timestamp)}</div>
      </div>
    </div>
  );
};

export default ChatMessage;

