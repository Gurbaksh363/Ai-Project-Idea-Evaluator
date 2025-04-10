document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('evaluator-form');
  const resultsSection = document.getElementById('results');
  
  // Initially hide results
  resultsSection.style.display = 'none';
  
  // Sample data for demonstration
  const categories = ['EdTech', 'FinTech', 'HealthTech', 'AI/ML', 'E-commerce', 'SaaS', 'IoT', 'Blockchain'];
  const pitchTemplates = [
      'An innovative platform that helps users to [benefit] through [technology].',
      'A revolutionary app that transforms how people [action] by leveraging [technology].',
      'A next-generation solution for [problem] using cutting-edge [technology].',
      'An AI-powered tool that enables [user group] to [benefit] more efficiently.'
  ];
  const feedbackTemplates = [
      'Your idea shows promise in a competitive market. Consider focusing on [specific aspect] to differentiate yourself. Early user testing will be crucial.',
      'This concept addresses a clear pain point. To strengthen it, develop a clear monetization strategy and consider how you\'ll scale beyond initial users.',
      'There\'s significant potential here. To maximize impact, clearly define your target audience and ensure your solution truly addresses their specific needs.',
      'Your project has strong technical merit. Consider partnerships with established players in the industry for faster market penetration.'
  ];
  
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const title = document.getElementById('project-title').value;
      const description = document.getElementById('project-description').value;
      
      // In a real application, you would send this data to an AI service
      // For demo purposes, we'll generate "AI" results based on the input
      
      // Simple algorithm to determine category based on keywords in description
      let category = categories[Math.floor(Math.random() * categories.length)];
      
      // Generate a pitch based on the title and description
      let pitch = generatePitch(title, description);
      
      // Generate feedback
      let feedback = generateFeedback(title, description);
      
      // Calculate a rating (in a real app, this would come from AI analysis)
      let rating = (6 + Math.random() * 4).toFixed(1); // Random rating between 6.0 and 10.0
      
      // Update the results
      document.getElementById('category-result').textContent = category;
      document.getElementById('pitch-result').textContent = pitch;
      document.getElementById('feedback-result').textContent = feedback;
      document.getElementById('rating-text').textContent = `${rating}/10`;
      document.getElementById('rating-fill').style.width = `${rating * 10}%`;
      
      // Show results with animation
      resultsSection.style.display = 'grid';
      setTimeout(() => {
          resultsSection.classList.add('visible');
          
          // Animate each card individually
          const cards = document.querySelectorAll('.result-card');
          cards.forEach(card => {
              card.style.opacity = '1';
          });
      }, 100);
      
      // Scroll to results
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  
  // Function to generate a pitch based on input
  function generatePitch(title, description) {
      const template = pitchTemplates[Math.floor(Math.random() * pitchTemplates.length)];
      
      // Extract keywords from title and description
      const words = (title + ' ' + description).toLowerCase().split(/\s+/);
      const keywords = words.filter(word => word.length > 4);
      
      // Replace placeholders with relevant content or fallbacks
      let pitch = template
          .replace('[technology]', findTechKeyword(description) || 'innovative technology')
          .replace('[benefit]', findBenefitKeyword(description) || 'solve problems')
          .replace('[action]', findActionKeyword(description) || 'interact with technology')
          .replace('[problem]', findProblemKeyword(description) || 'common challenges')
          .replace('[user group]', findUserGroupKeyword(description) || 'users');
          
      return pitch;
  }
  
  // Function to generate feedback
  function generateFeedback(title, description) {
      const template = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];
      
      // Replace specific aspect with something from the description
      return template.replace('[specific aspect]', findSpecificAspect(description) || 'user experience');
  }
  
  // Helper functions to extract keywords (simplified for demo)
  function findTechKeyword(text) {
      const techKeywords = ['AI', 'machine learning', 'blockchain', 'cloud', 'IoT', 'AR/VR', 'mobile', 'web3'];
      return findKeywordInText(text, techKeywords);
  }
  
  function findBenefitKeyword(text) {
      const benefitKeywords = ['save time', 'increase productivity', 'reduce costs', 'improve efficiency', 'enhance learning'];
      return findKeywordInText(text, benefitKeywords);
  }
  
  function findActionKeyword(text) {
      const actionKeywords = ['communicate', 'learn', 'work', 'shop', 'manage finances', 'track health'];
      return findKeywordInText(text, actionKeywords);
  }
  
  function findProblemKeyword(text) {
      const problemKeywords = ['inefficiency', 'high costs', 'complexity', 'accessibility', 'security concerns'];
      return findKeywordInText(text, problemKeywords);
  }
  
  function findUserGroupKeyword(text) {
      const userKeywords = ['students', 'professionals', 'businesses', 'developers', 'consumers', 'patients'];
      return findKeywordInText(text, userKeywords);
  }
  
  function findSpecificAspect(text) {
      const aspectKeywords = ['user onboarding', 'monetization strategy', 'marketing approach', 'technical architecture', 'mobile experience'];
      return findKeywordInText(text, aspectKeywords);
  }
  
  function findKeywordInText(text, keywords) {
      text = text.toLowerCase();
      for (const keyword of keywords) {
          if (text.includes(keyword.toLowerCase())) {
              return keyword;
          }
      }
      return null;
  }
});