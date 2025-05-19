export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  export const detectEntities = (message) => {
    // A simple entity detection implementation
    // In a real app, this would use a more sophisticated NLP approach
    const entities = [];
    
    // Detect program names
    const programPatterns = [
      { regex: /computer science|cs|software/i, entity: 'program', value: 'Computer Science' },
      { regex: /business|mba|management/i, entity: 'program', value: 'Business' },
      { regex: /arts|fine arts|liberal arts/i, entity: 'program', value: 'Arts' },
      // More programs
    ];
    
    programPatterns.forEach(pattern => {
      if (pattern.regex.test(message)) {
        entities.push({
          type: pattern.entity,
          value: pattern.value,
          confidence: 0.8 // Simplified confidence score
        });
      }
    });
    
    return entities;
  };