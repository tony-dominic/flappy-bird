import React from 'react'

function Title({ isPlay, startGame, position }) {
  return (
    <>
      {!isPlay && (
        <div
          style={{
            position: 'absolute',
            top: 150,
            left: '50%',
            textTransform: 'uppercase',
            fontSize: 30,
            fontWeight: 'bold',
            color: '#ff0000e3',
            cursor: 'pointer',
            transform: 'translate(-50%,-50%)'
          }}
          onClick={() => {
            startGame()
          }}
        >
          Start
        </div>
      )}
    </>
  )
}

export default Title
