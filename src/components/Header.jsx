
import React from 'react';

function Header() {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl font-semibold mb-2 text-gray-900">
        Resume Parser
      </h1>
      <p className="text-base text-gray-600">
        Upload a resume or paste text to extract key information
      </p>
    </header>
  );
}

export default Header;