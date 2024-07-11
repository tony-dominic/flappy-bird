import React from 'react'
import { useObserver } from 'mobx-react'

function Score({ position }) {
  return useObserver(() => (
    <div
      style={{
        position: 'absolute',
        top: 50,
        left: '50%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#a71612',
        transform: 'translate(-50%,-50%)',
        zIndex: 2
      }}
    >
      Score: {position.score}
    </div>
  ))
}

export default Score
