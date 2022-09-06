import React, { useEffect } from 'react'
//import Topbar

const Preview = ({ pin, nickname, questionNum, totalNumQuestions, nextStep }) => {
    useEffect(() => {
        setTimeout(() => nextStep(), 5000)
    }, [])

    return (
        <div className='preview'>
            <div>{nickname} {pin}
            </div>

            <div>Question {questionNum}</div>
        </div>
    )
}

export default Preview