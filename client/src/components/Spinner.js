import React from 'react';
const Spinner = () => {
  return (
    <div id="overlay">
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
