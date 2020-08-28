import React, { useEffect, useState } from 'react'
import Title from './Title'
import Score from './Score'
import Bird from './Bird'
import Pipe from './Pipe'
import Foreground from './Foreground'

import BgImage from '../images/bg.png'
import { useObserver, useLocalStore } from 'mobx-react'

let gameLoop
let pipeGenerator

function Main() {
  const [isPlay, setIsPlay] = useState(false)

  useEffect(() => {
    let down = false
    const { fly, start } = position

    const handleKeyDown = (e) => {
      if (down) return
      down = true

      if (e.keyCode === 32) {
        fly()
        setIsPlay(true)
      }
      start()
    }

    const handleKeyUp = () => {
      down = false
    }

    const handleOnMouseDown = (e) => {
      if (e.button === 0) {
        fly()
        setIsPlay(true)
      }
      start()
    }

    document.addEventListener('mousedown', handleOnMouseDown)

    document.addEventListener('keyup', handleKeyUp, false)
    document.addEventListener('keydown', handleKeyDown, false)
    return () => {
      document.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleOnMouseDown)
    }
  }, [isPlay])

  const position = useLocalStore(() => ({
    x: 300,
    y: 250,
    r: 0,
    score: 0,
    pipes: [
      {
        topHeight: 200
      }
    ],
    status: 'notPlaying',
    fly() {
      position.y -= 50
      position.r = -20
    },
    start() {
      if (position.status !== 'playing') {
        gameLoop = setInterval(() => {
          position.running()
          position.increaseScore()
          position.fall()
          position.check()
        }, 200)

        pipeGenerator = setInterval(() => {
          position.generate()
        }, 1000)

        position.status = 'playing'
      }
    },
    fall() {
      position.y += 20
      position.r = 20
    },
    running() {
      position.x -= 10
    },
    generate() {
      const topHeight = Math.round(Math.random() * 200) + 50
      position.pipes = [...position.pipes, { topHeight }]
    },
    increaseScore() {
      position.score += 10
    },
    check() {
      const challenges = position.pipes
        .map(({ topHeight }, i) => {
          return {
            x1: position.x + i * 200, // Top pipe
            y1: topHeight, // Height pipe
            x2: position.x + i * 200, // Bottom pipe
            y2: topHeight + 100 // Height bottom
          }
        })
        .filter(({ x1 }) => {
          if (x1 > 0 && x1 < 300) {
            return true
          }
        }) // Get bird in width screen

      if (position.y > 500 - 100 || position.y < 0) {
        // Check if touch top or bot
        position.gameOver()
      }

      if (challenges.length) {
        const { x1, y1, x2, y2 } = challenges[0]
        if (
          (x1 < 145 && 145 < x1 + 52 && position.y < y1 + 10) || // Touch pipe top
          (x2 < 145 && 145 < x2 + 52 && position.y > y2 - 10) // Touch pipe bottom
        ) {
          position.gameOver()
        }
      }
    },
    gameOver() {
      clearInterval(gameLoop)
      clearInterval(pipeGenerator)
      position.x = 300
      position.y = 250
      position.r = 0
      position.score = 0
      position.status = 'game-over'
      position.pipes = [
        {
          topHeight: 200
        }
      ]

      setIsPlay(false)
    }
  }))

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#a5e115',
          fontWeight: 'bold',
          fontSize: 30
        }}
      >
        Have fun 😁😁😁
      </div>
      <div
        style={{
          position: 'relative',
          top: '50%',
          left: '50%',
          width: 300,
          height: 500,
          backgroundImage: `url(${BgImage})`,
          overflow: 'hidden',
          transform: 'translate(-50%, -50%)',
          border: '1px solid black',
          borderRadius: 20,
          boxShadow: '0 20px 50px rgba(8, 112, 184, 0.7)'
        }}
      >
        <Title isPlay={isPlay} startGame={() => setIsPlay(true)} position={position} />
        <Score isPlay={isPlay} startGame={() => setIsPlay(true)} position={position} />
        <Bird position={position} />
        <Pipe position={position} />
        <Foreground />
      </div>
    </>
  )
}

export default Main

// <div style={{ position: 'relative', width: 300, height: 500, backgroundImage: `url(${BgImage})` }}>
//   <Bird />
//   <Pipe />
//   <Foreground />
// </div>
