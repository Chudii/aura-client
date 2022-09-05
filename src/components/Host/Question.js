import React, { useState, useEffect } from 'react'
import { socket } from '../Global/Global'

const Question = props => {
    const [time, setTime] = useState(20)
    const [playersAnswered, setPlayersAnswered] = useState(0)
    const [intervalId, setIntervalId] = useState('')

    const timer = () => {
        setTime(time - 1)

        if (time <= 0) {
            clearInterval(intervalId)
            const pin = props.pin
            socket.emit('question_end', pin)
            props.nextStep()
        }
    }

    useEffect(() => {
        const intervalId = setInterval(timer, 1000)
        setIntervalId(intervalId)

        socket.on('update_players_answered', playersAnswered => {
            setPlayersAnswered(playersAnswered)
        })

        socket.on('fetch_time', playerId => {
            const data = {
                pin: props.pin,
                playerId: playerId,
                time: time
            }

            socket.emit('send_time', data)
        })

        return () => {
            socket.off('update_players_answered')
            socket.off('fetch_time')
            clearInterval(intervalId)
        }
    })

    const AnsweredLabel = () => {
        if (playersAnswered === 1) {
            return <span>answer</span>
        } else {
            return <span>answers</span>
        }
    }

    return (
        <div className='question container'>
            <div>
               <h1>{props.question}</h1> 
            </div>

            <div>
                <div>{time}</div>
                <div>
                    <div>{playersAnswered || 0}</div>
                    <div><AnsweredLabel /></div>
                </div>
            </div>

            <div className='choices'>
                <div><div></div>{props.answers.a}</div>
                <div><div></div>{props.answers.b}</div>
                <div><div></div>{props.answers.c}</div>
                <div><div></div>{props.answers.d}</div>
            </div>
        </div>
    )
}

export default Question