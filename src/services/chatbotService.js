import { getFAQData } from '../utils/faqData';

const keywordMap = {
  'admission process': ['application', 'apply', 'admission', 'process', 'how to apply', 'steps', 'procedure'],
  'fee structure': ['fee', 'cost', 'tuition', 'price', 'payment', 'structure', 'charges', 'expenses'],
  'scholarships': ['scholarship', 'financial aid', 'grant', 'funding', 'support', 'assistance', 'merit'],
  'deadlines': ['deadline', 'due date', 'last date', 'when', 'time limit', 'submission date'],
  'requirements': ['requirement', 'criteria', 'qualification', 'eligibility', 'needed', 'prerequisite'],
  // More mappings
};

// Simple rule-based implementation with fuzzy matching
export const processRuleBasedMessage = async (message) => {
  // Get the FAQ data
  const faqData = await getFAQData();
  
  // Convert message to lowercase for case-insensitive matching
  const lowerMessage = message.toLowerCase();
  
  // Check for keyword matches
  const matches = Object.entries(keywordMap).filter(([category, keywords]) => {
    return keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
  });
  
  // If no matches, return a default response
  if (matches.length === 0) {
    return {
      text: "I'm not sure I understand your question. Could you please rephrase or try asking about admission process, fee structure, scholarships, deadlines, or requirements?",
      suggestions: ["Admission process", "Fee structure", "Scholarship options"]
    };
  }
  
  // If it's specifically asking about both admission process and fee structure
  if (matches.some(([cat]) => cat === 'admission process') && 
      matches.some(([cat]) => cat === 'fee structure')) {
    return {
      text: "Here's information about both our admission process and fee structure:",
      components: [
        {
          type: 'ordered-list',
          items: [
            'Submit online application ($50 application fee)',
            'Upload required documents', 
            'Schedule entrance test', 
            'Attend interview'
          ]
        },
        {
          type: 'table',
          headers: ['Program', 'Tuition (per year)'],
          rows: [
            ['Computer Science', '$15,000'],
            ['Business', '$14,500'],
            ['Arts', '$12,000']
          ]
        }
      ],
      suggestions: ['Scholarship options?', 'Application deadline?', 'Required documents?']
    };
  }
  
  // Return the response for the first matching category
  const [category] = matches[0];
  switch (category) {
    case 'admission process':
      return faqData.admissionProcess;
    case 'fee structure':
      return faqData.feeStructure;
    // Handle other categories
    default:
      return {
        text: `I have information about ${category}, but it's not fully implemented yet.`,
        suggestions: ["Admission process", "Fee structure"]
      };
  }
};