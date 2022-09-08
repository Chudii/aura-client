import React, { useState, useEffect } from 'react'
import { getQuizzes } from '../../../services/quiz-api'
import { Link } from 'react-router-dom'
import './Quizzes.css'

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([])

    const populateQuizzes = quizzes.map(quiz => {
        return <Link className='quiz' key={quiz._id} to={`/quizzes/${quiz._id}`}>
            <div>
                <h3>{quiz.title}</h3>
                <h4>{quiz.category}</h4>
                <h4>{quiz.questions.length} Questions</h4>
            </div>
        </Link>
    })

    useEffect(() => {
        getQuizzes().then(res => setQuizzes(res.data))
    })

    return (
        <div className='quizzes container'>
            <div className='title header'>
                <h4>Aura</h4>
            </div>
            <div className='all-quizzes'>
                {quizzes && populateQuizzes}
            </div>
            
        </div>
    )
}

export default Quizzes