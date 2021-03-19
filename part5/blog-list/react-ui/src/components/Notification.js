import React from 'react'

export const Notification = ({ notification }) => {
  const { text, action } = notification

  if (text === null) {
    return null
  }

  const style = action
    ? action
    : 'none'

  return (
    <h2 className={style}>{text}</h2>
  )
}
