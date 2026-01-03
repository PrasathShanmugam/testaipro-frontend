import React from 'react';

const Card = ({ children, className = '', 'data-testid': testId, ...props }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ${className}`}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
