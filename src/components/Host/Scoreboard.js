import React from 'react'
import { socket } from '../Global/Global'

const Scoreboard = ({ pin, rankedPlayers, questionNum, totalNumQuestions, nextQuestion, endGame, gameStatus }) => {
    const finishGame = () => {
        endGame()
    }

    const handleClick = () => {
        nextQuestion()
        const data = {
            pin: pin,
            questionNum: questionNum + 1
        }
        socket.emit('fetch_next_question', data)
    }

    return (
        <div className='scoreboard container'>
            <div>
                <h1>Scoreboard</h1>
            </div>

            <div>
                <div>
                    {
                        questionNum !== totalNumQuestions ? 
                        <button onClick={handleClick}>Next</button>
                        : <button onClick={finishGame}>End</button>
                    }
                </div>
                {
                    rankedPlayers.length === 0 ?
                    <div>Scoreboard Loading...</div>
                    : <Ranked playerRanks={rankedPlayers} />
                }
            </div>
        </div>
    )
}

const Ranked = ({ playerRanks }) => {
    const playerRankings = playerRanks.map((r, i) => (
        <div key={i}>
            <div>{r.nickname}</div>
            <div>{r.score}</div>
        </div>
    ))

    return (
        <div>
            {playerRankings}
        </div>
    )
}

export default Scoreboard