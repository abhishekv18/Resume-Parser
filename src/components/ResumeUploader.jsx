
import React from 'react';

function ResumeUploader({ textInput, setTextInput, onFileUpload, onTextParse, loading }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
     
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer transition-colors hover:border-gray-400 hover:bg-gray-50">
        <label htmlFor="file-upload" className="cursor-pointer block">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-gray-700 font-medium block">
            Upload PDF or DOCX
          </span>
          <span className="text-gray-500 text-sm mt-1 block">
            or drag and drop
          </span>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

     
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-gray-500 text-sm">OR</span>
        </div>
      </div>


      <div className="space-y-4">
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 resize-vertical text-sm"
          placeholder="Paste resume text here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          rows="8"
        />
        <button 
          onClick={onTextParse}
          disabled={!textInput.trim() || loading}
          className="w-full bg-gray-900 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Parse Text
        </button>
      </div>
    </div>
  );
}

export default ResumeUploader;