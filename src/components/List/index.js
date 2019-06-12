import React from 'react';

const List = ({ list }) => {
  return (
    <ul style={{ fontSize: 20, paddingLeft: 20 }}>
      {list.map((item, index) => {
        return (
          <li key={index} style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <div style={{ width: 60, textAlign: 'left', fontWeight: 600 }}>{item.value}</div>
            <div style={{ width: 20, height: 20, background: item.color }} />
            <div style={{ marginLeft: 6, fontWeight: 400 }}>{item.content}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
