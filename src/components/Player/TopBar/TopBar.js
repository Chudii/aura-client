import React from 'react'
import './TopBar.css'

const TopBar = props => {
    return (
        <div className='top-bar' style={{ minHeight: '10vh' }}>
            <div className='left'>
                <div className='topbar-pin'>PIN: {props.pin}</div>
                <QuestionDisplay questionNum={props.questionNum} totalNumQuestions={props.totalNumQuestions} />
            </div>
            <div style={{ textAlign: 'right' }} className='top-nickname'>{props.nickname}</div>
        </div>
    )
}

const QuestionDisplay = props => {
    let component
    if (props.questionNum === undefined) {
        return null
    } else {
        component = <div style={{ textAlign: 'left' }}>{props.questionNum} of {props.totalNumQuestions}</div>
    }

    return <>{component}</>
}

export default TopBar