import React, { Component } from 'react'
// may need work


// const Result = ({ answers, answeredA, answeredB, answeredC, answeredD, correctAnswer, question, pin, nextStep, fetchScoreboard }) => {
//     const [message, setMessage] = useState('')
//     const [heightA, setHeightA] = useState(0)
//     const [heightB, setHeightB] = useState(0)
//     const [heightC, setHeightC] = useState(0)
//     const [heightD, setHeightD] = useState(0)
//     const [aOpacity, setAOpacity] = useState(0)
//     const [bOpacity, setBOpacity] = useState(0)
//     const [cOpacity, setCOpacity] = useState(0)
//     const [dOpacity, setDOpacity] = useState(0)
//     const [aTick, setATick] = useState('')
//     const [bTick, setBTick] = useState('')
//     const [cTick, setCTick] = useState('')
//     const [dTick, setDTick] = useState('')

//     const handleClick = () => {
//         nextStep()
//         fetchScoreboard()
//     }

//     if (correctAnswer === null) {
//         setMessage('Results Loading...')
//     }

//     const sum = answeredA + answeredB + answeredC + answeredD

//     setHeightA(1 + answeredA/sum * 19)
//     setHeightB(1 + answeredB/sum * 19)
//     setHeightC(1 + answeredC/sum * 19)
//     setHeightD(1 + answeredD/sum * 19)

//     if (correctAnswer === 'a') {
//         setAOpacity(1)
//         setATick('checked')
//     } else if (correctAnswer === 'b') {
//         setBOpacity(1)
//         setBTick('checked')
//     } else if (correctAnswer === 'c') {
//         setCOpacity(1)
//         setCTick('checked')
//     } else if (correctAnswer === 'd') {
//         setDOpacity(1)
//         setDTick('checked')
//     }

    // return (
    //     <div className='result container'>
    //         <div>
    //             <h1>{question}</h1>
    //         </div>

    //         <div>
    //             <div>
    //                 <button onClick={handleClick}>Next</button>
    //             </div>
    //             <div>
    //                 <div className='chart'>
    //                     <div className='column'>
    //                         <div className='a'>
    //                             <div>a</div>
    //                         </div>
    //                         <div></div>
    //                         <div>{aTick} {answeredA}</div>
    //                     </div>
    //                     <div className='column'>
    //                         <div className='b'>
    //                             <div>b</div>
    //                         </div>
    //                         <div></div>
    //                         <div>{bTick} {answeredB}</div>
    //                     </div>
    //                     <div className='column'>
    //                         <div className='c'>
    //                             <div>c</div>
    //                         </div>
    //                         <div></div>
    //                         <div>{cTick} {answeredC}</div>
    //                     </div>
    //                     <div className='column'>
    //                         <div className='d'>
    //                             <div>d</div>
    //                         </div>
    //                         <div></div>
    //                         <div>{dTick} {answeredD}</div>
    //                     </div>
    //                 </div>

    //                 <div className='choices'>
    //                     <div>a. {answers.a}</div>
    //                     <div>b. {answers.b}</div>
    //                     <div>c. {answers.c}</div>
    //                     <div>d. {answers.d}</div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
// }

// export default Result

export default class Result extends Component {
    
    handleClick = () => {
        this.props.nextStep()
        this.props.fetchScoreboard()
    }

    render() {
        const { answers, answeredA, answeredB, answeredC, answeredD, correctAnswer, question, pin } = this.props

        if (correctAnswer === null) {
            return <div>Results Loading...</div>
        }

        const sum = answeredA + answeredB + answeredC + answeredD

        const heightA = 1 + answeredA/sum * 19
        const heightB = 1 + answeredA/sum * 19
        const heightC = 1 + answeredA/sum * 19
        const heightD = 1 + answeredA/sum * 19

        let aOpacity
        let bOpacity
        let cOpacity
        let dOpacity

        let aTick = ''
        let bTick = ''
        let cTick = ''
        let dTick = ''

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

        return (
            <div className='result container'>
            <div>
                <h1>{question}</h1>
            </div>

            <div>
                <div>
                    <button onClick={this.handleClick}>Next</button>
                </div>
                <div>
                    <div className='chart'>
                        <div className='column'>
                            <div className='a'>
                                <div>a</div>
                            </div>
                            <div></div>
                            <div>{aTick} {answeredA}</div>
                        </div>
                        <div className='column'>
                            <div className='b'>
                                <div>b</div>
                            </div>
                            <div></div>
                            <div>{bTick} {answeredB}</div>
                        </div>
                        <div className='column'>
                            <div className='c'>
                                <div>c</div>
                            </div>
                            <div></div>
                            <div>{cTick} {answeredC}</div>
                        </div>
                        <div className='column'>
                            <div className='d'>
                                <div>d</div>
                            </div>
                            <div></div>
                            <div>{dTick} {answeredD}</div>
                        </div>
                    </div>

                    <div className='choices'>
                        <div>a. {answers.a}</div>
                        <div>b. {answers.b}</div>
                        <div>c. {answers.c}</div>
                        <div>d. {answers.d}</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}