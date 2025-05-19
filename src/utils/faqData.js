export const getFAQData = async () => {
  // In a real app, this could fetch from a local JSON file or API
  return {
    admissionProcess: {
      text: "Our admission process consists of 4 steps: application submission, document verification, entrance test, and interview.",
      components: [
        {
          type: 'ordered-list',
          items: [
            'Submit online application',
            'Upload required documents', 
            'Schedule entrance test', 
            'Attend interview'
          ]
        }
      ],
      suggestions: ['Application deadline?', 'Required documents?', 'Test preparation?']
    },
    feeStructure: {
      text: "Our fee structure varies by program:",
      components: [
        {
          type: 'table',
          headers: ['Program', 'Application Fee', 'Tuition (per year)'],
          rows: [
            ['Computer Science', '$50', '$15,000'],
            ['Business', '$50', '$14,500'],
            ['Arts', '$45', '$12,000']
          ]
        }
      ],
      suggestions: ['Scholarship options?', 'Payment plans?', 'Financial aid?']
    },
    // More FAQ categories
  };
}; 