import React from 'react'
export default function FancyBorder (props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      <h1>hhh</h1>
      {props.children}
    </div>
  )
}