import React from 'react'
import Main from './Main'
import './index.less'

import { Provider } from 'mobx-react'
// import { stores } from '../store'

function App() {
  return (
    <Provider>
      <Main />
    </Provider>
  )
}

export default App
