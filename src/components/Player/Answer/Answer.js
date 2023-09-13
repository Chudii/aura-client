import React, { useState } from 'react'
import TopBar from '../TopBar/TopBar'
import './Answer.css'

const Answer = ({ submitAnswer, pin, nickname, questionNum, totalNumQuestions, answers }) => {
    const [answer, setAnswer] = useState('')
    const [buttonsOn, setButtonsOn] = useState(true)

    const handleClick = evt => {
        submitAnswer(evt.target.value)
        console.log(evt.target.value)
        setButtonsOn(false)
    }

    let body

    if (!buttonsOn) {
        body = (
            <div className='answer-submitted'>
                <h3>Answer submitted. Waiting for other players.</h3>
            </div>
        )
    } else {
        body = (
            <div className='answer-choices'>
                <div className='upper'>
                    <button className='player-a' onClick={handleClick} value='a'>Ê</button>
                    <button className='player-b' onClick={handleClick} value='b'>Ë</button>
                </div>
                <div className='lower'>
                    <button className='player-c' onClick={handleClick} value='c'>Ì</button>
                    <button className='player-d' onClick={handleClick} value='d'>Í</button>
                </div>
            </div>
        )
    }

    return (
        <div className='player-answer'>
            <TopBar pin={pin} nickname={nickname} questionNum={questionNum} totalNumQuestions={totalNumQuestions} />
            {body}
        </div>
    )
}

export default Answer

