import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { socket } from './Global/Global'

const Home = () => {
    const [nickname, setNickname] = useState('')
    const [pin, setPin] = useState(null)
    const [message, setMessage] = useState(null)

    const nav = useNavigate()

    const handleNicknameInput = evt => {
        setNickname(evt.target.value)
    }

    const handlePinInput = evt => {
        setPin(evt.target.value)
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        socket.emit('player_joined', {
            nickname: nickname,
            pin: parseInt(pin)
        })
    }

    const HandleError = () => {
        if (message === null) {
            return null
        } else if (message === 'Not found') {
            return <div>Invalid game pin. Try again.</div>
        } else if (message === 'Nickname taken') {
            return <div>Sorry, that nickname is taken.</div>
        }
    }

    useEffect(() => {

        socket.on('nickname_taken', () => {
            setMessage('Nickname taken')
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        })

        socket.on('game_not_found', () => {
            setMessage('Not found')
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        })

        socket.on('player_joined_success', data => {
            nav(`/joined?nickname=${nickname}&pin=${pin}`)
        })
    })

    return (
        <div className='home container'>
            <h1>Join Server</h1>
            <form action='/player' onSubmit={handleSubmit}>
                <div>
                    <label>Enter Nickname</label>
                    <input 
                        id='name' 
                        type='text' 
                        name='nickname' 
                        onChange={handleNicknameInput}
                    />
                </div>
                <div>
                    <label>Game Pin</label>
                    <input 
                        id='pin' 
                        type='number' 
                        name='pin' 
                        onChange={handlePinInput}
                    />
                </div>
                <div>
                    <button type='submit'>Join</button>
                </div>

                <div>
                    <HandleError />
                </div>
                <Link to={`/quizzes`}>Host Server</Link>
                <Link to={`/quizzes/create`}>Create Quiz</Link>
            </form>
        </div>
    )
}

//`/play?room=${randomNum}`

export default Home