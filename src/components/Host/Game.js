import React, { useEffect, useState } from 'react'
// import React, { Component } from 'react'
import { socket } from '../Global/Global'
import QuestionIntro from './QuestionIntro'
import Question from './Question'
import Result from './Result'
import Scoreboard from './Scoreboard'
import GameOver from './GameOver'
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
            setAnswers(question.answers)
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

        socket.on('receive_scoreboard', rankedPlayers => {
            setRankedPlayers(rankedPlayers)
        })

        socket.on('next_question', data => {
            const { questionNumber, question } = data
            setQuestionNum(questionNumber)
            setQuestion(question)
            setAnswers(question.answers)
            setCorrectAnswer(question.correct)
        })

        socket.on('game_over', data => {
            setGameStatus(false)
            setRankedPlayers(data)
        })
    }, [])

    const RenderSwitch = () => {
        switch (step) {
            case 1:
                return <QuestionIntro
                    nextStep={nextStep}
                    questionNum={questionNum}
                    question={question}
                    totalNumQuestions={totalNumQuestions}
                />
            case 2:
                return <Question 
                    nextStep={nextStep}
                    pin={pin}
                    question={question}
                    answers={answers}
                />
            case 3:
                return <Result
                    answers={answers}
                    answeredA={answeredA}
                    answeredB={answeredB}
                    answeredC={answeredC}
                    answeredD={answeredD}
                    correctAnswer={correctAnswer}
                    question={question}
                    pin={pin}
                    nextStep={nextStep}
                    fetchScoreboard={fetchScoreboard}
                />
            case 4:
                return <Scoreboard
                    pin={pin}
                    rankedPlayers={rankedPlayers}
                    questionNum={questionNum}
                    totalNumQuestions={totalNumQuestions}
                    nextQuestion={nextQuestion}
                    endGame={endGame}
                    gameStatus={gameStatus}
                />
            case 5:
                return <GameOver
                    quizName={quizName}
                    totalNumQuestions={totalNumQuestions}
                    finalRankings={rankedPlayers}
                />
            default:
                return null
        }
    }

    return (
      <div className='game container'>
        <RenderSwitch />
      </div>
    )
}

export default Game
