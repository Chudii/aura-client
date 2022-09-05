import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { socket } from '../Global/Global'
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
    },[])

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
                <div>Join at this site: | site |</div>
                <div>with this Game PIN: </div>
                <div>{pin}</div>
            </div>

            <div>
                <div>
                    <div>
                        {playersCount || 0}
                    </div>
                    <div>
                        <PlayerLabel />
                    </div>
                </div>
            </div>

            <Link to={`/start?quizId=${quizId}&pin=${pin}`}>
                <button onClick={startGame}>Start</button>
            </Link>

            <div>
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
        <div key={p._id}>
            {p.nickname}
        </div>
    ))

    return (
        <div>
            {playerNames}
        </div>
    )
}

export default Lobby