import React from 'react';
import dotNetLogo from '../components/Members/dotnet.png';
import javaLogo from '../components/Members/java.png';
import jsLogo from '../components/Members/js.png';
import salesforceLogo from '../components/Members/salesforce.png';

const getDirectionIcon = (direction) => {
  switch (direction) {
    case 'Java':
      return <img src={javaLogo} alt='java' width='50px' />;
    case '.Net':
      return <img src={dotNetLogo} alt='.net' width='34px' />;
    case 'Javascript':
      return <img src={jsLogo} alt='js' width='34px' />;
    case 'Salesforce':
      return <img src={salesforceLogo} alt='sf' width='34px' />;
    default:
      throw new Error('invalid course name');
  }
};

export default getDirectionIcon;
