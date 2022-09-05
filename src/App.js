import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Host from './components/Host'
import Game from './components/Game'
import Quizzes from './components/Quiz/Quizzes'
import ShowQuiz from './components/Quiz/ShowQuiz'
import Lobby from './components/Host/Lobby'
import Joined from './components/Player/Joined'
import Ready from './components/Player/Ready'
import Start from './components/Host/Start'
import { Global } from './components/Global/Global'

function App() {

  return ( 
    <div className='App'>
      <Global />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quizzes' element={<Quizzes />} />
          <Route path='/quizzes/:quizId' element={<ShowQuiz />} />
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/joined' element={<Joined />} />
          <Route path='/ready' element={<Ready />} />
          <Route path='/start' element={<Start />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App