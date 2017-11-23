import React from 'react'
import FancyBorder from './FancyBorder'
export default function WelcomeDialog () {
  return (
    <FancyBorder>
      <h1 className="dialog-title">
        Welcome
      </h1>
      <p className="dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  )
}