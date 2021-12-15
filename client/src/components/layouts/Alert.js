import React from 'react';

const Alert = ({ info }) => {
  return info === null ? null : (
    <div className="alertms" variant={info.type}>
      <span>{info.message}</span>
    </div>
  );
};

export default Alert;
