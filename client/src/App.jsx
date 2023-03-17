import { useState } from 'react'
import NavBar from './Components/navbar'
import Profile from './Components/Profile'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Profile name="John Smith" currentPoints="245" currentRank="black"></Profile>
    </div>
  )
}

export default App
