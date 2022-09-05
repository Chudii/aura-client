// import React, { useEffect, useState } from 'react'
// import io from 'socket.io-client'
// import queryString from 'query-string'
// import Host from '../components/Host'

// const ENDPOINT = 'http://localhost:3001'
// const connectionOptions = {
//     "forceNew": true,
//     "reconnectionAttempts": "Infinity",
//     "timeout": 100000
// }
// const socket = io.connect(ENDPOINT, connectionOptions)

// const Game = () => {
//     const data = queryString.parse(window.location.search)

//     const [room, setRoom] = useState(data.room)
//     const [playerName, setPlayerName] = useState(data.name)
//     const [messages, setMessages] = useState('')
//     const [roomFull, setRoomFull] = useState(false)
//     const [players, setPlayers] = useState([])

//     const [isHost, setIsHost] = useState(false)
    
    
//     useEffect(() => {
        
//         console.log(socket)
//         if (!data.name) {
//             setIsHost(true)
//         }

//         socket.emit('join', { room: room, name: playerName }, (error) => {
//             if (error)
//             setRoomFull(true)
//         })

//         // return function cleanup() {
//         //     socket.emit('disconnect')
//         //     socket.off()
//         // }
//     }, [])

//     useEffect(() => {
//         socket.on('message', (message) => {
//             setMessages(message.text)
//         })
//         socket.on('roomData', ({ players }) => {
//             setPlayers(players)
//         })
//     }, [players])

//     return (
//         <div className='container'>
//             {isHost ? 
//                 <Host playerList={players} messages={messages} sock={socket}/> : 
//                 <div>
//                     <h3>Players in the Lobby:</h3>
//                     {players.map(player => <p key={player.id}>{player.name}</p>)}
//                 </div>
                
                
//             }
//         </div>
//     )
// }

// export default Game