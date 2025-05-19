import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ChatbotModeSelector from './components/ChatbotModeSelector';
import './App.css';

function App() {
  const [chatbotMode, setChatbotMode] = useState('rule-based');
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>College Admission Assistant</h1>
        <ChatbotModeSelector 
          currentMode={chatbotMode} 
          onModeChange={setChatbotMode} 
        />
      </header>
      <main>
        <ChatInterface mode={chatbotMode} />
      </main>
      <footer className="app-footer">
        <p>© 2025 College Admission Assistant</p>
      </footer>
    </div>
  );
}

export default App;