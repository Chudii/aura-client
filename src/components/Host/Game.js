import React, { useEffect, useState } from 'react'
import { socket } from '../Global/Global'
const queryString = require('query-string')

const Game = () => {
    const [step, setStep] = useState(1)
    const [gameId, setGameId] = useState(null)
    const [quizId, setQuizId] = useState(null)
    const [quizName, setQuizName] = useState(null)
    const [pin, setPin] = useState(null)
    const [questionNum, setQuestionNum] = useState(1)
    const [totalNumQuestions, setTotalNumQuestions] = useState(null)
    const [questionStatus, setQuestionStatus] = useState(true)
    const [question, setQuestion] = useState(null)
    const [answers, setAnswers] = useState([])
    const [answeredA, setAnsweredA] = useState(0)
    const [answeredB, setAnsweredB] = useState(0)
    const [answeredC, setAnsweredC] = useState(0)
    const [answeredD, setAnsweredD] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState(null)
    const [gameStatus, setGameStatus] = useState(true)
    const [rankedPlayers, setRankedPlayers] = useState([])

    const nextStep = () => {
        setStep(step + 1)

        if (questionNum === totalNumQuestions) {
            setGameStatus(false)
        }
    }

    const nextQuestion = () => {
        setStep(1)
        setRankedPlayers([])
        setAnsweredA(0)
        setAnsweredB(0)
        setAnsweredC(0)
        setAnsweredD(0)
        setCorrectAnswer(null)

        socket.emit('proceed_to_next_question', pin)
    }

    const endGame = () => {
        setStep(5)
        
        socket.emit('finish_game', pin)
    }

    const fetchScoreboard = () => {
        socket.emit('fetch_scoreboard', gameId)
        console.log('Host requesting scoreboard.')
    }

    useEffect(() => {
        const parsed = queryString.parse(window.location.search)
        const quizId = parsed.quizId
        const pin = parseInt(parsed.pin)
        setPin(pin)
        setQuizId(quizId)

        socket.emit('fetch_first_question', pin)

        socket.on('receive_first_question', data => {
            const { gameId, quizName, question, totalNumQuestions } = data
            setGameId(gameId)
            setQuizName(quizName)
            setQuestion(question.question)
            setCorrectAnswer(question.correct)
            setTotalNumQuestions(totalNumQuestions)
        })

        socket.on('question_result', data => {
            const { answeredA, answeredB, answeredC, answeredD, correctAnswer } = data
            setAnsweredA(answeredA)
            setAnsweredB(answeredB)
            setAnsweredC(answeredC)
            setAnsweredD(answeredD)
            setCorrectAnswer(correctAnswer)
            setStep(3)
        })

        socket.on('game_over', data => {
            setGameStatus(false)
            setRankedPlayers(data)
        })
    })

    const assignComponent = () => {
        let component
    }

    return (
      <div className='game container'>
        
      </div>
    )
}

export default Game