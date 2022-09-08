import React from 'react'
import TopBar from '../TopBar/TopBar'
import './Result.css'

const Result = ({ pin, questionNum, totalNumQuestions, nickname, lastCorrect, streak, rank, score }) => {
    return (
        <div className='player-result'>
            <TopBar pin={pin} questionNum={questionNum} totalNumQuestions={totalNumQuestions} nickname={nickname} />

            <div className='mid-card'>
                <div className='answer-status'>
                    {
                        lastCorrect ? 
                        <>
                            <div className='isCorrect'>Correct</div>
                            <div className='is-checked'>
                                “
                            </div>
                        </>
                        : 
                        <>
                            <div className='isCorrect'>Incorrect</div>
                            <div className='is-checked'>
                                ”
                            </div>
                        </>
                    }
                </div>   
                <div className='streak-line'>
                    {
                        streak > 0 &&
                        <>
                            <div className='answer-streak'>Answer streak</div>
                            <div className='streak'><p>{streak}</p></div>
                        </>
                    }
                </div>
                <div className='rank-placing'>
                    {
                        rank === 1 ?
                        <>You are in 1st place</> :
                        rank === 2 ?
                        <>You are in 2nd place</> :
                        rank === 3 ?
                        <>You are in 3rd place</> :
                        <>{`You are in ${rank}th place`}</>
                    }
                </div>
            </div>
        </div>
    )
}

export default Result