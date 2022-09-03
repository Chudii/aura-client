import React from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Home = () => {
    const [nickname, setNickname] = useState('')
    const [room, setRoom] = useState('')

    const randomNum = Math.floor(Math.random() * 10000 + 1000)

    return (
        <div className='home container'>
            <h1>Join Server</h1>
            <form action='/player'>
                <div>
                    <label>Enter Nickname</label>
                    <input 
                        id='name' 
                        type='text' 
                        name='name' 
                        onChange={(evt) => setNickname(evt.target.value)}
                    />
                </div>
                <div>
                    <label>Game Pin</label>
                    <input 
                        id='pin' 
                        type='number' 
                        name='pin' 
                        onChange={(evt) => setRoom(evt.target.value)}
                    />
                </div>
                <div>
                    <Link to={`/play?room=${room}&name=${nickname}`}>
                        <button>Join</button>
                    </Link>
                    
                </div>
                <Link to={`/quizzes`}>Host Server</Link>
            </form>
        </div>
    )
}

//`/play?room=${randomNum}`

export default Home