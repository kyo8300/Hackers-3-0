import React, { Fragment } from 'react';
import programmingLoading from './programmingLoading.gif';

export default () => (
  <Fragment>
    <img
      src={programmingLoading}
      style={{
        textAlign: 'center',
        maxWidth: '50%',
        margin: 'auto',
        marginTop: '120px',
        display: 'block'
      }}
      alt="Loading"
    />
  </Fragment>
);
