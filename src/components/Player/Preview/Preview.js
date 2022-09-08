import React, { useEffect } from 'react'
import TopBar from '../TopBar/TopBar'
import './Preview.css'

const Preview = ({ pin, nickname, questionNum, totalNumQuestions, nextStep }) => {
    useEffect(() => {
        setTimeout(() => nextStep(), 5000)
    }, [])

    return (
        <div className='preview-cont'>
            <TopBar pin={pin} nickname={nickname} questionNum={questionNum} totalNumQuestions={totalNumQuestions}/>

            <div className='mid'>Question {questionNum}</div>
        </div>
    )
}

export default Preview