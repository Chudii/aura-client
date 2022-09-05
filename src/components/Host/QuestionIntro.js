import React, { useEffect } from 'react'

const QuestionIntro = props => {
    useEffect(() => {
        let id = setTimeout(() => props.nextStep(), 5000)

        return () => {
            clearTimeout(id)
        }
    })

    return (
        <div className='gameintro container'>
            <div>
                {props.questionNum} of {props.totalNumQuestions}
            </div>

            <div>
                {props.question}
            </div>
        </div>
    )
}

export default QuestionIntro