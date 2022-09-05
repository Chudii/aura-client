import axios from 'axios'


export const getQuizzes = async () => {
    try {
        const URL = `http://localhost:3001/quizzes`
        const response = axios.get(URL)
        return response
    } catch (err) {
        console.log(err)
    }

    
}

export const getQuiz = (id) => {
    const URL = `http://localhost:3001/quizzes/${id}`
    const response = axios.get(URL)
    return response
}