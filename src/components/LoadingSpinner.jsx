
import React from 'react';

function LoadingSpinner() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-10 text-center mb-8">
      <div className="w-12 h-12 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 text-sm">
        Processing resume...
      </p>
    </div>
  );
}

export default LoadingSpinner;