import React from 'react';
import styles from './index.module.less';

const Tag = ({ text }) => {
  return (
    <div className={styles.tag}>
      <span>{text}</span>
    </div>
  );
};

export default Tag;
