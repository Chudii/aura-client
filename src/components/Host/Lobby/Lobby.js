import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { socket } from '../../Global/Global'
import './Lobby.css'
const queryString = require('query-string')


const Lobby = () => {
    const [quizId, setQuizId] = useState(null)
    const [pin, setPin] = useState(null)
    const [players, setPlayers] = useState(null)
    const [playersCount, setPlayersCount] = useState(null)
    const [disabled, setDisabled] = useState(false)
    
    useEffect(() => {
        const parsed = queryString.parse(window.location.search)
        const quizId = parsed.quizId
        setQuizId(quizId)

        socket.emit('host_joined', quizId)

        socket.on('show_pin', data => {
            setPin(data.pin)
        })

        socket.on('update_lobby', playersData => {
            if (playersData.playersCount === 0) {
                setPlayers(null)
                setPlayersCount(null)
            } else {
                setPlayers(playersData.players)
                setPlayersCount(playersData.playersCount)
                setDisabled(false)
            }
        })

        return () => {
            socket.off('show_pin')
            socket.off('update_lobby')
        }
    }, [])

    const startGame = () => {
        socket.emit('host_started_game', pin)
    }

    const PlayerLabel = () => {
        if (playersCount === 1) {
            return <span>Player</span>
        } else {
            return <span>Players</span>
        }
    }

    return (
        <div className='lobby container'>
            <div className='topbar'>
                <div className='pin-message'>Enter Game PIN to Join: </div>
                <div className='pin'>{pin}</div>
            </div>
            <div className='title header'>
                <h4>Aura</h4>
            </div>

            <div className='mid-section'>
                <div className='player-count'>
                    <div>
                        {playersCount || 0}
                    </div>
                    <div>
                        <PlayerLabel />
                    </div>
                </div>
                <Link to={`/start?quizId=${quizId}&pin=${pin}`}>
                    <button className='start-button' onClick={startGame}>Start</button>
                </Link>
            </div>

            

            <div className='player-container'>
                <Players players={players} playersCount={playersCount} />
            </div>
        </div>
    )
}

const Players = props => {
    if (props.players === null || props.playersCount === null) {
        return null
    } 

    const playerNames = props.players.map((p, i) => (
        <div className='player' key={p._id}>
            {p.nickname}
        </div>
    ))

    return (
        <div className='player-list'>
            {playerNames}
        </div>
    )
}

export default Lobby