import React from 'react'

const GameOver = ({ quizName, totalNumQuestions, finalRankings }) => {
    return (
        <div className='gameover container'>
            <div className='title'>
                <div>{quizName}</div>
            </div>
            <FinalRankings rankings={finalRankings} totalNumQuestions={totalNumQuestions} />
        </div>
    )
}

const FinalRankings = ({ rankings, totalNumQuestions }) => {
    const [first, second, third] = rankings

    const firstDiv = (
        <div className='column'>
            <div className='firstBar'>
                <div>
                    {first.score}
                </div>

                <div>
                    {first.totalCorrect} out of {totalNumQuestions}
                </div>
            </div>
            <div>
                {first.nickname}
            </div>
        </div>
    )

    let secondDiv
    
    if (second) {
        secondDiv = (
            <div className='column'>
            <div className='secondBar'>
                <div>
                    {second.score}
                </div>

                <div>
                    {second.totalCorrect} out of {totalNumQuestions}
                </div>
            </div>
            <div>
                {second.nickname}
            </div>
        </div>
        )
    } else {
        secondDiv = (
            <div className='column'>
                <div className='secondBar'></div>
            </div>
        )
    }

    let thirdDiv
    
    if (third) {
        thirdDiv = (
            <div className='column'>
            <div className='thirdBar'>
                <div>
                    {third.score}
                </div>

                <div>
                    {third.totalCorrect} out of {totalNumQuestions}
                </div>
            </div>
            <div>
                {third.nickname}
            </div>
        </div>
        )
    } else {
        thirdDiv = (
            <div className='column'>
                <div className='thirdBar'></div>
            </div>
        )
    }

    return (
        <div className='finalrankings'>
            <div className='podiums'>
                {secondDiv}
                {firstDiv}
                {thirdDiv}
            </div>
        </div>
    )
}

export default GameOver