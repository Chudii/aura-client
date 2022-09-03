import React, { useEffect, useState } from 'react'
import queryString from 'query-string'

const Host = ({ playerList, messages, sock }) => {
    const data = queryString.parse(window.location.search)
    const [room, setRoom] = useState(data.room)
    const [players, setPlayers] = useState(playerList)
    const [socket, setSocket] = useState(sock)

    useState(() => {
    }, [])

    useEffect(() => {
        socket.on('roomData', ({ players }) => {
            setPlayers(players)
        })
    }, [players])

    return (
        <div>
            <h3>Join Game with the Code Below</h3>
            <h1>{room}</h1>
            {players.length > 0 ? players.map(player => <p key={player.id}>{player.name}</p>) : null}
        </div>
    )
}

export default Host