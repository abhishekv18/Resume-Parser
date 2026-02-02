/**
 * Parse resume text to extract key information
 * @param {string} text - Raw resume text
 * @returns {object} Parsed data object
 */
export const parseResumeText = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      name: 'Not found',
      email: 'Not found',
      phone: 'Not found',
      skills: ['Not found']
    };
  }

  // Extract email
  const emailRegex = /[\w.+-]+@[\w-]+\.[\w.-]+/;
  const emailMatch = text.match(emailRegex);
  
  // Extract phone number
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  
  // Extract name - handle case where entire resume is on one line
  let name = 'Not found';
  
  // First, try to extract name from the very beginning of the text
  // Name is usually before email/phone
  const textBeforeEmail = emailMatch ? text.substring(0, text.indexOf(emailMatch[0])) : text.substring(0, 100);
  
  // Clean up the text and split by common separators
  const nameCandidate = textBeforeEmail
    .split(/[#|•·\n\r]+/)[0]  // Take first part before separators
    .trim()
    .replace(/\s+/g, ' ');  // Normalize spaces
  
  // Validate the name candidate
  if (nameCandidate.length >= 3 && nameCandidate.length <= 50) {
    // Check if it's mostly letters
    const letterCount = (nameCandidate.match(/[a-zA-Z]/g) || []).length;
    const spaceCount = (nameCandidate.match(/\s/g) || []).length;
    
    // Name should be mostly letters and spaces
    if (letterCount + spaceCount >= nameCandidate.length * 0.8) {
      // Should not contain numbers (except maybe Roman numerals)
      if (!/\d/.test(nameCandidate)) {
        name = nameCandidate;
      }
    }
  }
  
  // Extract skills
  const skills = extractSkills(text);
  
  return {
    name: name,
    email: emailMatch ? emailMatch[0] : 'Not found',
    phone: phoneMatch ? phoneMatch[0] : 'Not found',
    skills: skills.length > 0 ? skills : ['Not found']
  };
};

/**
 * Extract skills from resume text
 * @param {string} text - Raw resume text
 * @returns {array} Array of skills
 */
const extractSkills = (text) => {
  const skillKeywords = [
    'technical skills',
    'skills',
    'programming',
    'technologies', 
    'expertise', 
    'proficiencies',
    'competencies'
  ];
  
  const skills = [];
  const lowerText = text.toLowerCase();
  
  for (let keyword of skillKeywords) {
    const keywordIndex = lowerText.indexOf(keyword);
    if (keywordIndex !== -1) {
      // Get text after keyword (look for up to 800 chars)
      const afterKeyword = text.substring(keywordIndex + keyword.length, keywordIndex + keyword.length + 800);
      
      // Split by common delimiters and clean
      const extractedSkills = afterKeyword
        .split(/[,•|·\n:()]/)
        .map(s => s.trim())
        .filter(s => s.length > 2 && s.length < 60)
      .filter(s => !/^[-–—\s]+$/.test(s))
        .filter(s => !/^\d+$/.test(s))  // Remove pure numbers
        .filter(s => !/(^(programming|languages|frameworks|web|development|data|databases|tools|technologies|specializations|platforms|competencies)$)/i.test(s))
        .filter(s => !s.toLowerCase().includes('education'))
        .filter(s => !s.toLowerCase().includes('experience'))
        .filter(s => s !== '');
      
      skills.push(...extractedSkills);
      
      // If we found skills, break
      if (skills.length > 0) break;
    }
  }
  
  // Remove duplicates and limit
  return [...new Set(skills)].slice(0, 15);
};