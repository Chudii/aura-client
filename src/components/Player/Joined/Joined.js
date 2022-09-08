import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { socket } from '../../Global/Global'
import TopBar from '../TopBar/TopBar'
import './Joined.css'
const queryString = require('query-string')

const Joined = () => {
    const [nickname, setNickname] = useState(null)
    const [pin, setPin] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [hostDisconnected, setHostDisconnected] = useState(false)
    
    useEffect(() => {
        const parsed = queryString.parse(window.location.search)
        const nickname = parsed.nickname
        const pin = parseInt(parsed.pin)
        setNickname(nickname)
        setPin(pin)

        socket.on('game_started', () => {
            setRedirect(true)
        })

        socket.on('host_disconnected', () => {
            setHostDisconnected(true)
        })

        return () => {
            socket.off('game_started')
            socket.off('host_disconnected')
        }
    }, [])

    return (
        <div className='joined container'>
            <TopBar pin={pin} nickname={nickname}/>

            <div className='mid'>
                <div>You're in.</div>
                <div>
                See your name on the screen?
            </div>
            </div>

            
            {
                redirect ? 
                <Navigate to={`/ready?nickname=${nickname}&pin=${pin}`} />
                : null
            }
            {
                hostDisconnected ? 
                <Navigate to='/' />
                : null
            }
        </div>
    )
}

export default Joined