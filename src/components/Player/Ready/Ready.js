import React, { useState, useEffect } from 'react'
import { socket } from '../../Global/Global'
import { Navigate } from 'react-router-dom'
import TopBar from '../TopBar/TopBar'
import './Ready.css'
const queryString = require('query-string')

const Ready = () => {
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

        let id = setTimeout(() => setRedirect(true), 5000)

        socket.on('host_disconnected', () => {
            setHostDisconnected(true)
        })

        return () => {
            clearTimeout(id)
            socket.off('host_disconnected')
        }
    }, [])

    return (
        <div className='ready container'>
            <TopBar pin={pin} nickname={nickname}/>

            <div className='mid'>Get Ready</div>
            {
                redirect ? 
                <Navigate to={`/play?nickname=${nickname}&pin=${pin}`} />
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

export default Ready