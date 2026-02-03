
export const parseResumeText = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      name: 'Not found',
      email: 'Not found',
      phone: 'Not found',
      skills: ['Not found']
    };
  }


  const emailRegex = /[\w.+-]+@[\w-]+\.[\w.-]+/;
  const emailMatch = text.match(emailRegex);
  

  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  

  let name = 'Not found';
  

  const textBeforeEmail = emailMatch ? text.substring(0, text.indexOf(emailMatch[0])) : text.substring(0, 100);
  

  const nameCandidate = textBeforeEmail
    .split(/[#|•·\n\r]+/)[0]  
    .trim()
    .replace(/\s+/g, ' ');  
  

  if (nameCandidate.length >= 3 && nameCandidate.length <= 50) {
   
    const letterCount = (nameCandidate.match(/[a-zA-Z]/g) || []).length;
    const spaceCount = (nameCandidate.match(/\s/g) || []).length;
    
   
    if (letterCount + spaceCount >= nameCandidate.length * 0.8) {
      
      if (!/\d/.test(nameCandidate)) {
        name = nameCandidate;
      }
    }
  }
  

  const skills = extractSkills(text);
  
  return {
    name: name,
    email: emailMatch ? emailMatch[0] : 'Not found',
    phone: phoneMatch ? phoneMatch[0] : 'Not found',
    skills: skills.length > 0 ? skills : ['Not found']
  };
};


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
     
      const afterKeyword = text.substring(keywordIndex + keyword.length, keywordIndex + keyword.length + 800);
      
    
      const extractedSkills = afterKeyword
        .split(/[,•|·\n:()]/)
        .map(s => s.trim())
        .filter(s => s.length > 2 && s.length < 60)
      .filter(s => !/^[-–—\s]+$/.test(s))
        .filter(s => !/^\d+$/.test(s))  
        .filter(s => !/(^(programming|languages|frameworks|web|development|data|databases|tools|technologies|specializations|platforms|competencies)$)/i.test(s))
        .filter(s => !s.toLowerCase().includes('education'))
        .filter(s => !s.toLowerCase().includes('experience'))
        .filter(s => s !== '');
      
      skills.push(...extractedSkills);
      
      
      if (skills.length > 0) break;
    }
  }
  
  
  return [...new Set(skills)].slice(0, 15);
};