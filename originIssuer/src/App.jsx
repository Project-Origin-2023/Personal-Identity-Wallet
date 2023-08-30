import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './home'
import Login from './Login'

import './App.css'

function App() {

  return (
  <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
        </Routes>
      </header>
    </div>
    </Router>
  )
}

export default App
