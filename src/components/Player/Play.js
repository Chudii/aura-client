import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { socket } from '../Global/Global'
import Preview from './Preview'
import Answer from './Answer'
import Result from './Result'
import Ranking from './Ranking'

const queryString = require('query-string')

export default class Play extends Component {
    constructor() {
        super()
        this.state = {
            step: 1,
            gameId: null,
            nickname: null,
            pin: null,
            answer: null,
            score: 0,
            streak: 0,
            rank: 0,
            lastCorrect: false,
            totalCorrect: 0,
            questionNum: 1,
            totalNumQuestions: null,
            answers: [],
            hostDisconnected: false
        }
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step: step + 1
        })
    }

    submitAnswer = letter => {
        this.setState({
            answer: letter
        })

        const data = {
            answer: letter,
            gameId: this.state.gameId
        }

        socket.emit('answer_submitted', data)
    }

    componentDidMount() {
        const parsed = queryString.parse(window.location.search)
        const nickname = parsed.nickname
        const pin = parsed.pin
        this.setState({
            nickname: nickname,
            pin: pin
        })

        socket.on('host_disconnected', () => {
            this.setState({
                hostDisconnected: true
            })
        })

        socket.emit('fetch_num_questions', pin)

        socket.on('receive_num_questions', data => {
            const { gameId, totalNumQuestions } = data
            this.setState({
                gameId: gameId,
                totalNumQuestions: totalNumQuestions
            })
        })

        socket.on('receive_answer_options', data => {
            this.setState({
                questionNum: data.questionNumber,
                answers: data.answers
            })
        })

        socket.on('question_result', data => {
            const { nickname, gameId } = this.state
            const info = {
                nickname: nickname,
                gameId: gameId
            }

            socket.emit('fetch_score', info)
        })

        socket.on('player_results', data => {
            const { step } = this.state
            const { score, rank, streak, lastCorrect } = data
            this.setState({
                score: score,
                rank: rank,
                streal: streak,
                lastCorrect: lastCorrect,
                step: step + 1
            })
        })

        socket.on('receive_next_answer_options', data => {
            const { questionNumber, totalNumQuestions, answers } = data
            this.setState({
                questionNum: questionNumber,
                totalNumQuestions: totalNumQuestions,
                answers: answers
            })
        })

        socket.on('go_to_next_question', () => {
            this.setState({
                step: 1
            })
        })

        socket.on('game_over', () => {
            const gameId = this.state.gameId
            socket.emit('player_rank', gameId)
        })

        socket.on('final_rank', data => {
            const { score, totalCorrect, rank } = data
            this.setState({
                score: score,
                totalCorrect: totalCorrect,
                rank: rank
            })
        })

        socket.on('final_view', () => {
            this.setState({
                step: 4
            })
        })
    }

    render() {
        const { step } = this.state
        const { pin, nickname, score, streak, lastCorrect, questionNum, totalNumQuestions, answers, rank } = this.state

        let component = null
        switch (step) {
            case 1: 
                component = <Preview
                    nextStep={this.nextStep}
                    pin={pin}
                    nickname={nickname}
                    questionNum={questionNum}
                    totalNumQuestions={totalNumQuestions}
                />
                break
            case 2:
                component = <Answer
                    submitAnswer={this.submitAnswer}
                    pin={pin}
                    nickname={nickname}
                    questionNum={questionNum}
                    totalNumQuestions={totalNumQuestions}
                    answers={answers}
                />
                break
            case 3:
                component = <Result
                    pin={pin}
                    questionNum={questionNum}
                    totalNumQuestions={totalNumQuestions}
                    nickname={nickname}
                    lastCorrect={lastCorrect}
                    streak={streak}
                    rank={rank}
                    score={score}
                />
                break
            case 4:
                component = <Ranking
                    nickname={nickname}
                    rank={rank}
                    score={score}
                />
                break
            default:
                component = null
        }

        return (
            <div>
                {component}
                {
                    this.state.hostDisconnected ?
                    <Navigate to='/' />
                    : null
                }
            </div>
            
        )
    }
}