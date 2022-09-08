import React, { useEffect } from 'react'
import './QuestionIntro.css'

const QuestionIntro = props => {
    useEffect(() => {
        let id = setTimeout(() => props.nextStep(), 5000)

        return () => {
            clearTimeout(id)
        }
    })

    return (
        <div className='gameintro container'>
            <div className='top-left'>
                {props.questionNum} of {props.totalNumQuestions}
            </div>

            <div className='question-card'>
                <div className='question-block'>
                    {props.question}
                </div>
                
            </div>
        </div>
    )
}

export default QuestionIntro