
import React from 'react';

function ParsedResults({ 
  parsedData, 
  isEditing, 
  setIsEditing, 
  onFieldChange, 
  onSkillsChange, 
  onReset 
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
   
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Parsed Information
        </h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-900 text-white font-medium px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            {isEditing ? 'Done Editing' : 'Edit'}
          </button>
          <button 
            onClick={onReset}
            className="bg-white text-gray-700 font-medium px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-gray-50 p-5 rounded-md border border-gray-200">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={parsedData.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 text-gray-900"
            />
          ) : (
            <p className="text-gray-900 break-words">
              {parsedData.name}
            </p>
          )}
        </div>

      
        <div className="bg-gray-50 p-5 rounded-md border border-gray-200">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              value={parsedData.email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 text-gray-900"
            />
          ) : (
            <p className="text-gray-900 break-words">
              {parsedData.email}
            </p>
          )}
        </div>

        <div className="bg-gray-50 p-5 rounded-md border border-gray-200">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Phone
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={parsedData.phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 text-gray-900"
            />
          ) : (
            <p className="text-gray-900 break-words">
              {parsedData.phone}
            </p>
          )}
        </div>

        
        <div className="md:col-span-2 bg-gray-50 p-5 rounded-md border border-gray-200">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Skills
          </label>
          {isEditing ? (
            <input
              type="text"
              value={parsedData.skills.join(', ')}
              onChange={(e) => onSkillsChange(e.target.value)}
              placeholder="Separate skills with commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 text-gray-900"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {parsedData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParsedResults;