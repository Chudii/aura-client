import './ShowQuiz.css'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getQuiz } from '../../../services/quiz-api'

const ShowQuiz = () => {
    const [id, setId] = useState({})
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [questions, setQuestions] = useState([])
    const { quizId } = useParams()

    useEffect(() => {
        getQuiz(quizId).then(res => {
            const { _id, title, category, questions } = res.data
            setId(_id)
            setTitle(title)
            setCategory(category)
            setQuestions(questions)
        })
    })

    return (
        <div className='quizzes'>
            <div className='title header'>
                <h4>Aura</h4>
            </div>
            <h2 className='sub-title'>Quiz Preview</h2>
            <h3 className='quiz-title'>Title: {title}</h3>
            <h3 className='quiz-category'>Category: {category}</h3>
            <PreviewQuestions questions={questions}/>
            <Link to={`/lobby?quizId=${id}`}>
                <button className='host-button'>Host Game</button>
            </Link>
        </div>
    )
}

const PreviewQuestions = props => {
    if (props.questions.length === 0) {
        return <div>Loading questions..</div>
    }

    const questions = props.questions.map((q, i) => (
        <div key={i} className='question'>
            <div>Question {i + 1}</div>
            <p>{q.question}</p>
        </div>
    ))

    return (
        <div className='quiz-list'>
            {questions}
        </div>
    )
}

export default ShowQuiz