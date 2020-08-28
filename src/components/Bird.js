import React from 'react'
import BirdImage from '../images/bird.png'

import { useObserver } from 'mobx-react'

function Bird({ position }) {
  return useObserver(() => (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: 120,
        width: 38,
        height: 26,
        backgroundImage: `url(${BirdImage})`,
        transform: `rotate(${position.r}deg)`,
        transition: 'transform 200ms, top 200ms, bottom 200ms'
      }}
    />
  ))
}

export default Bird
