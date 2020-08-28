import React from 'react'

import PipeTopImage from '../images/pipe-top.png'
import PipeBottomImage from '../images/pipe-bottom.png'
import { useObserver } from 'mobx-react'

function Pipe({ position }) {
  return useObserver(() => (
    <>
      {position.pipes.map((pipe, i) => (
        <div style={{ position: 'relative' }} key={pipe + i}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: position.x + i * 200,
              width: 52,
              height: pipe.topHeight,
              backgroundImage: `url(${PipeTopImage})`,
              transition: 'left 200ms',
              backgroundPosition: 'bottom'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: pipe.topHeight + 100,
              left: position.x + i * 200,
              width: 52,
              height: 400,
              backgroundImage: `url(${PipeBottomImage})`,
              transition: 'left 200ms'
            }}
          />
        </div>
      ))}
    </>
  ))
}

export default Pipe
