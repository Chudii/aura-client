import React, { useState } from 'react'

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
            <div>
                <div>Answer submitted. Waiting for other players.</div>
            </div>
        )
    } else {
        body = (
            <div>
                <div>
                    <button className='player-a' onClick={handleClick} value='a'>a</button>
                </div>
                <div>
                    <button className='player-b' onClick={handleClick} value='b'>b</button>
                </div>
                <div>
                    <button className='player-c' onClick={handleClick} value='c'>c</button>
                </div>
                <div>
                    <button className='player-d' onClick={handleClick} value='d'>d</button>
                </div>
            </div>
        )
    }

    return (
        <div className='player-answer'>
            <div>{nickname} {pin}</div>
            {body}
        </div>
    )
}

export default Answer