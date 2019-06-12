import React from 'react';
import styles from './index.module.less';

const IntervalTitle = ({width, title}) => {
    return (
        <div className={styles.interval} style={{width}}>
            <div className={styles.line}></div>
            <div style={{marginLeft: 10, marginRight: 10, fontSize: 24}}>{title}</div>
            <div className={styles.line}></div>
        </div>
    )
}

export default IntervalTitle;

