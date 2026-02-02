
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ResumeUploader from './components/ResumeUploader';
import ParsedResults from './components/ParsedResults';
import LoadingSpinner from './components/LoadingSpinner';
import { parseResumeText } from './utils/parser';
import { extractTextFromPDF, extractTextFromDOCX } from './utils/fileProcessors';

function App() {
  const [parsedData, setParsedData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: []
  });
  const [textInput, setTextInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const handleFileUpload = async (file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    setLoading(true);

    try {
      let extractedText = '';
      
      if (fileExtension === 'pdf') {
        extractedText = await extractTextFromPDF(file);
      } else if (fileExtension === 'docx') {
        extractedText = await extractTextFromDOCX(file);
      } else {
        alert('Please upload a PDF or DOCX file');
        setLoading(false);
        return;
      }
      
      setTextInput(extractedText);
      const parsed = parseResumeText(extractedText);
      setParsedData(parsed);
      setLoading(false);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
      setLoading(false);
    }
  };

 
  const handleTextParse = () => {
    if (textInput.trim()) {
      const parsed = parseResumeText(textInput);
      setParsedData(parsed);
    }
  };

  
  const handleFieldChange = (field, value) => {
    setParsedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  
  const handleSkillsChange = (value) => {
    const skillsArray = value.split(',').map(s => s.trim()).filter(s => s);
    setParsedData(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };


  const handleReset = () => {
    setParsedData({
      name: '',
      email: '',
      phone: '',
      skills: []
    });
    setTextInput('');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Header />
      
      <div className="max-w-4xl mx-auto">
        <ResumeUploader
          textInput={textInput}
          setTextInput={setTextInput}
          onFileUpload={handleFileUpload}
          onTextParse={handleTextParse}
          loading={loading}
        />

        {loading && <LoadingSpinner />}

        {(parsedData.name || parsedData.email || parsedData.phone) && !loading && (
          <ParsedResults
            parsedData={parsedData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onFieldChange={handleFieldChange}
            onSkillsChange={handleSkillsChange}
            onReset={handleReset}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;