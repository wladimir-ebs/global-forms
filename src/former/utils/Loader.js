import React, { Fragment } from 'react';
import { Icon } from 'antd';
import './Loader.css';

export default ({ loading, children }) => (
  <Fragment>
    {loading && (
      <div className="zh-loader">
        <Icon type="loading" />
      </div>
    )}

    <div className="zh-loader-section" style={{ display: loading ? 'none' : 'block' }}>
      {children}
    </div>
  </Fragment>
);
