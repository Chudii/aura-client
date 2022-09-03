import React, { useState, useEffect } from 'react'
import quizList from '../services/quizList'

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState(quizList)

    const populateQuizzes = quizzes.map(quiz => {
        return <div key={quiz.id}>
            <h3>{quiz.title}</h3>
            <h4>{quiz.category}</h4>
            <h4>{quiz.questions.length} Questions</h4>
        </div>
    })

    useEffect(() => {
        console.log(quizzes)
    }, [quizzes])

    return (
        <div>
            {populateQuizzes}
        </div>
    )
}

export default Quizzes