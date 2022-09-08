import React, { Component } from 'react'
import { socket } from '../Global/Global'
import QuestionIntro from './QuestionIntro/QuestionIntro'
import Question from './Question/Question'
import Result from './Result/Result'
import Scoreboard from './Scoreboard/Scoreboard'
import GameOver from './GameOver/GameOver'
const queryString = require('query-string')

export default class Game extends Component {
    constructor() {
        super()
        this.state = {
            step: 1,
            gameId: null,
            quizId: null,
            quizName: null,
            pin: null,
            questionNum: 1,
            totalNumQuestions: null,
            questionStatus: true,
            question: null,
            answers: [],
            answeredA: 0,
            answeredB: 0,
            answeredC: 0,
            answeredD: 0,
            correctAnswer: null,
            gameStatus: true,
            rankedPlayers: []
        }
    }

    nextStep = () => {
        const { step, questionNum, totalNumQuestions } = this.state
        this.setState({
            step: step + 1
        })

        if (questionNum === totalNumQuestions) {
            this.setState({
                gameStatus: false
            })
        }
    }

    nextQuestion = () => {
        this.setState({
            step: 1,
            rankedPlayers: [],
            answeredA: 0,
            answeredB: 0,
            answeredC: 0,
            answeredD: 0,
            correctAnswer: null
        })
        const { pin } = this.state
        socket.emit('proceed_to_next_question', pin)
    }

    endGame = () => {
        this.setState({
            step: 5
        })
        const { pin } = this.state
        socket.emit('finish_game', pin)
    }

    fetchScoreboard = () => {
        const { gameId } = this.state
        socket.emit('fetch_scoreboard', gameId)
        console.log('Host requesting for scoreboard')
    }

    componentDidMount() {
        const parsed = queryString.parse(window.location.search)
        const quizId = parsed.quizId
        const pin = parseInt(parsed.pin)
        this.setState({
            pin: pin,
            quizId: quizId
        })

        socket.emit('fetch_first_question', pin)

        socket.on('receive_first_question', data => {
            const { gameId, quizName, question, totalNumQuestions } = data
            this.setState({
                gameId: gameId,
                quizName: quizName,
                question: question.question,
                answers: question.answers,
                correctAnswer: question.correct,
                totalNumQuestions: totalNumQuestions
            })
        })

        socket.on('question_result', data => {
            const { answeredA, answeredB, answeredC, answeredD, correctAnswer } = data
            this.setState({
                answeredA: answeredA,
                answeredB: answeredB,
                answeredC: answeredC,
                answeredD: answeredD,
                correctAnswer: correctAnswer,
                step: 3
            })
        })

        socket.on('receive_scoreboard', rankedPlayers => {
            this.setState({
                rankedPlayers: rankedPlayers
            })
        })

        socket.on('next_question', data => {
            const { questionNumber, question } = data
            this.setState({
                questionNum: questionNumber,
                question: question.question,
                answers: question.answers,
                correctAnswer: question.correct
            })
        })

        socket.on('game_over', data => {
            this.setState({
                gameStatus: false,
                rankedPlayers: data
            })
        })
    }

    render() {
        const { step } = this.state
        const { quizName, pin, questionNum, totalNumQuestions, question, answers, answeredA, answeredB, answeredC, answeredD, correctAnswer, playersAnswered, rankedPlayers, gameStatus } = this.state

        let component = null
        switch (step) {
            case 1:
                component = <QuestionIntro
                    nextStep={this.nextStep}
                    questionNum={questionNum}
                    question={question}
                    totalNumQuestions={totalNumQuestions}
                />
                break
            case 2:
                component = <Question 
                    nextStep={this.nextStep}
                    pin={pin}
                    question={question}
                    answers={answers}
                />
                break
            case 3:
                component = <Result
                    answers={answers}
                    answeredA={answeredA}
                    answeredB={answeredB}
                    answeredC={answeredC}
                    answeredD={answeredD}
                    correctAnswer={correctAnswer}
                    question={question}
                    pin={pin}
                    nextStep={this.nextStep}
                    fetchScoreboard={this.fetchScoreboard}
                />
                break
            case 4:
                component = <Scoreboard
                    pin={pin}
                    rankedPlayers={rankedPlayers}
                    questionNum={questionNum}
                    totalNumQuestions={totalNumQuestions}
                    nextQuestion={this.nextQuestion}
                    endGame={this.endGame}
                    gameStatus={gameStatus}
                />
                break
            case 5:
                component = <GameOver
                    quizName={quizName}
                    totalNumQuestions={totalNumQuestions}
                    finalRankings={rankedPlayers}
                />
                break
            default:
                component = null
        }

        return (
            <div>
                {component}
            </div>
        )
    }
}