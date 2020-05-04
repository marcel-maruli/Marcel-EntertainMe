import React from 'react';
import Helmet from 'react-helmet';

export default ({ title }) => {
  const defaultTitle = `EntertainMeh`;

  return (
    <Helmet>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
    </Helmet>
  );
};
