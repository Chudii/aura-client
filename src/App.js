import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from './components/Home'
import Host from './components/Host'
import Game from './components/Game'
import Quizzes from './components/Quizzes';

// const socket = io.connect("http://localhost:3001")

function App() {
  // const [room, setRoom] = useState('')
  // const [message, setMessage] = useState('')
  // const [messageReceived, setMessageReceived] = useState('')

  // const joinRoom = () => {
  //   if (room !== '') {
  //     socket.emit('join_room', room)
  //   }
  // }

  // const sendMessage = () => {
  //   socket.emit('send_message', { message, room } )
  // }

  // useEffect(() => {
  //   socket.on('receive_message', (data) => {
  //     setMessageReceived(data.message)
  //   })
  // }, [socket])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/play' element={<Game />} />
        <Route path='/quizzes' element={<Quizzes />} />
      </Routes>
    </Router>
  )
}

export default App

// <div className="App">
    //   <input 
    //     placeholder='room number' 
    //     onChange={(evt) => setRoom(evt.target.value)}
    //   />
    //   <button onClick={joinRoom}>Join Room</button>
    //   <input 
    //     placeholder='message' 
    //     onChange={(evt) => setMessage(evt.target.value)}
    //   />
    //   <button onClick={sendMessage}>Send Message</button>
    //   <h1>Message:</h1>
    //   {messageReceived}
    // </div>