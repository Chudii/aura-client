import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { socket } from '../../Global/Global'
import Fire from '../../Logo/Fire'
import './Home.css'

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
            <div className='logo'>
                <h1 className='title'>Aura</h1>
                <Fire className='fire'/>
            </div>

            <div className='form-container'>
                <form action='/player' onSubmit={handleSubmit} autoComplete='off'>
                    <div>
                        <input 
                            id='name' 
                            type='text' 
                            name='nickname' 
                            onChange={handleNicknameInput}
                            placeholder='DISPLAY NAME'
                            maxLength={16}
                        />
                    </div>
                    <div>
                        <input 
                            id='pin' 
                            type='number' 
                            name='pin' 
                            onChange={handlePinInput}
                            placeholder='PIN'
                        />
                    </div>
                    <div>
                        <button className='join-button' type='submit'>Join</button>
                    </div>

                    <div>
                        <HandleError />
                    </div>                 
                </form>
            </div>
            
            <div className='links'>
                        <p><Link className='link' to={`/quizzes`}>Host Quiz</Link> | <Link className='link' to={`/`}>Create Quiz</Link></p>
                    </div>
        </div>
    )
}

export default Home