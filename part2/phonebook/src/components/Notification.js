import React from 'react';

const Notification = ({message}) => {
  const {text, action} = message;

  if (text === null) {
    return null;
  }

  const style = action
    ? action
    : 'none';

  return <div className={style}>{text}</div>;
};

export default Notification;
