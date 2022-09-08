// import React from 'react'
import React, { Component } from 'react'
import { socket } from '../../Global/Global'
import './Scoreboard.css'

export default class Scoreboard extends Component {

    finishGame = () => {
        this.props.endGame()
    }

    handleClick = () => {
        this.props.nextQuestion()
        const data = {
            pin: this.props.pin,
            questionNumber: this.props.questionNum + 1
        }
        socket.emit('fetch_next_question', data)
    }

    render() {
        
        let body
        if (this.props.rankedPlayers.length === 0) {
            body = <div>Scoreboard Loading...</div>
        } else {
            body = <Ranked playerRanks={this.props.rankedPlayers}/>
        }

        const { pin, questionNum, totalNumQuestions } = this.props

        let button
        if (questionNum !== totalNumQuestions) {
            button = <button className='next-button' onClick={this.handleClick}>Next</button>
        } else {
            button = <button className='next-button' onClick={this.finishGame}>End</button>
        }

        return (
            <div className='board'>
                <div className='hdr'>
                    <h1>Scoreboard</h1>
                </div>

                <div className='score-container'>
                    <div className='button-container'>
                        {button}
                    </div>
                    {body}
                </div>
            </div>
        )
    }
}

const Ranked = ({ playerRanks }) => {
    const playerRankings = playerRanks.map((r, i) => (
        <div key={i} className='player-rank'>
            <div className='player-nickname'>{r.nickname}</div>
            <div className='player-score'>{r.score}</div>
        </div>
    ))

    return (
        <div className='scoreboard'>
            {playerRankings}
        </div>
    )
}