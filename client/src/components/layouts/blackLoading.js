import React, { Fragment } from 'react';
import blackLoading from './blackLoading.gif';

export default () => (
  <Fragment>
    <img
      src={blackLoading}
      style={{
        textAlign: 'center',
        maxWidth: '50%',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        display: 'block',
      }}
      alt="Loading"
    />
  </Fragment>
);
