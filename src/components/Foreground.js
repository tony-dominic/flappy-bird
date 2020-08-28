import React from 'react'
import ForegroundImage from '../images/fg.png'

function Foreground() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        width: 300,
        height: 100,
        backgroundImage: `url(${ForegroundImage})`
      }}
    ></div>
  )
}

export default Foreground
