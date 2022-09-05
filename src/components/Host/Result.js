import React, { useState } from 'react'

const Result = props => {
    const [message, setMessage] = useState('')
    const [heightA, setHeightA] = useState(0)
    const [heightB, setHeightB] = useState(0)
    const [heightC, setHeightC] = useState(0)
    const [heightD, setHeightD] = useState(0)
    const [aOpacity, setAOpacity] = useState(0)
    const [bOpacity, setBOpacity] = useState(0)
    const [cOpacity, setCOpacity] = useState(0)
    const [dOpacity, setDOpacity] = useState(0)
    const [aTick, setATick] = useState('')
    const [bTick, setBTick] = useState('')
    const [cTick, setCTick] = useState('')
    const [dTick, setDTick] = useState('')

    const handleClick = () => {
        props.nextStep()
        props.fetchScoreboard()
    }

    const handleResult = () => {
        const { answeredA, answeredB, answeredC, answeredD, correctAnswer } = props
        if (correctAnswer === null) {
            setMessage('Results Loading')
        }

        const sum = answeredA + answeredB + answeredC + answeredD

        setHeightA(1 + answeredA/sum * 19)
        setHeightB(1 + answeredB/sum * 19)
        setHeightC(1 + answeredC/sum * 19)
        setHeightD(1 + answeredD/sum * 19)

        if (correctAnswer === 'a') {
            aOpacity = 1
            aTick = 'checked'
        } else if (correctAnswer === 'b') {
            bOpacity = 1
            bTick = 'checked'
        } else if (correctAnswer === 'c') {
            cOpacity = 1
            cTick = 'checked'
        } else if (correctAnswer === 'd') {
            dOpacity = 1
            dTick = 'checked'
        }
    }

    return (
        <div className='result container'>
            <div>
                <h1>{props.question}</h1>
            </div>

            <div>
                <div>
                    <button onClick={handleClick}>Next</button>
                </div>
                <div>
                    <div className='chart'>
                        <div className='column'>
                            <div className='a'>
                                <div>a</div>
                            </div>
                            <div></div>
                            <div>{aTick} {props.answeredA}</div>
                        </div>
                        <div className='column'>
                            <div className='b'>
                                <div>b</div>
                            </div>
                            <div></div>
                            <div>{bTick} {props.answeredB}</div>
                        </div>
                        <div className='column'>
                            <div className='c'>
                                <div>c</div>
                            </div>
                            <div></div>
                            <div>{cTick} {props.answeredC}</div>
                        </div>
                        <div className='column'>
                            <div className='d'>
                                <div>d</div>
                            </div>
                            <div></div>
                            <div>{dTick} {props.answeredD}</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result