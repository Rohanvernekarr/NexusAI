import React from 'react'
import Sidebar from './component/Sidebar/SIdebar'
import Main from './component/Main/Main'
import ContextProvider from './context/Context'

const App = () => {
  return (
    <ContextProvider>
    <Sidebar />
    <Main />
    
    </ContextProvider>
  )
}

export default App
