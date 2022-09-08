import React from 'react'
import './GameOver.css'

const GameOver = ({ quizName, totalNumQuestions, finalRankings }) => {
    return (
        <div className='gameover container'>
            <div className='title-container'>
                <div className='quiz-title'>{quizName}</div>
            </div>
            <FinalRankings rankings={finalRankings} totalNumQuestions={totalNumQuestions} />
            <div className='ground'></div>
        </div>
    )
}

const FinalRankings = ({ rankings, totalNumQuestions }) => {
    const [first, second, third] = rankings

    const firstDiv = (
        <div className='plyr-column'>
            <div className='firstBar'>
                <div>
                    {first.score}
                </div>

                <div>
                    {first.totalCorrect} out of {totalNumQuestions}
                </div>
            </div>
            <div className='plyr-nickname'>
                {first.nickname}
            </div>
        </div>
    )

    let secondDiv
    
    if (second) {
        secondDiv = (
            <div className='plyr-column'>
            <div className='secondBar'>
                <div>
                    {second.score}
                </div>

                <div>
                    {second.totalCorrect} out of {totalNumQuestions}
                </div>
            </div>
            <div className='plyr-nickname'>
                {second.nickname}
            </div>
        </div>
        )
    } else {
        secondDiv = (
            <div className='plyr-column'>
                <div className='secondBar'></div>
            </div>
        )
    }

    let thirdDiv
    
    if (third) {
        thirdDiv = (
            <div className='plyr-column'>
            <div className='thirdBar'>
                <div>
                    {third.score}
                </div>

                <div>
                    {third.totalCorrect} out of {totalNumQuestions}
                </div>
            </div>
            <div className='plyr-nickname'>
                {third.nickname}
            </div>
        </div>
        )
    } else {
        thirdDiv = (
            <div className='plyr-column'>
                <div className='thirdBar'></div>
            </div>
        )
    }

    return (
        <div className='main'>
            <div className='podiums'>
                {secondDiv}
                {firstDiv}
                {thirdDiv}
            </div>
        </div>
    )
}

export default GameOver