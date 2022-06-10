import React from 'react';

export const LoaderSpinner = ({type = 'warn'}) => {
  return (
    <div className={`spinner-border text-${type}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
};