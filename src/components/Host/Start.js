import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { socket } from '../Global/Global'
const queryString = require('query-string')

const Start = () => {
    const [pin, setPin] = useState(null)
    const [quizId, setQuizId] = useState(null)
    const [quizName, setQuizName] = useState(null)
    const [totalNumQuestions, setTotalNumQuestions] = useState(null)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        const parsed = queryString.parse(window.location.search)
        const quizId = parsed.quizId
        const pin = parseInt(parsed.pin)
        setPin(pin)
        setQuizId(quizId)

        socket.emit('fetch_intro', pin)

        let id

        socket.on('game_intro', data => {
            const { quizName, totalNumQuestions } = data
            setQuizName(quizName)
            setTotalNumQuestions(totalNumQuestions)

            id = setTimeout(() => setRedirect(true), 5000)
        })

        return () => {
            clearTimeout(id)
        }
    }, [])

    return (
        <div className='start container'>
            <div>
                <h1>{quizName}</h1>
            </div>

            <div>
                <div>{totalNumQuestions} Questions</div>
                <div>Are you ready?</div>
            </div>
            {
                redirect ?
                <Navigate to={`/game?quizId=${quizId}&pin=${pin}`} />
                : null
            }
        </div>
    )
}

export default Start