import React, { Component } from 'react'
import './Result.css'

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
        const heightB = 1 + answeredB/sum * 19
        const heightC = 1 + answeredC/sum * 19
        const heightD = 1 + answeredD/sum * 19

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
            aTick = '“'
        } else if (correctAnswer === 'b') {
            bOpacity = 1
            bTick = '“'
        } else if (correctAnswer === 'c') {
            cOpacity = 1
            cTick = '“'
        } else if (correctAnswer === 'd') {
            dOpacity = 1
            dTick = '“'
        }

        return (
            <div className='result container'>
                <div className='top-question'>
                    <h1>{question}</h1>
                </div>

                <div className='button-container'>
                    <button className='next-button' onClick={this.handleClick}>Next</button>
                </div>
                <div className='middle'>
                    <div className='chart'>
                        <div className='column'>
                            <div className='a'>
                                <div>Ê</div>
                            </div>
                            <div className='a-choice' style={{ height: `${heightA}rem` }}></div>
                            <div className='answered-container'><div className='is-correct'>{aTick}</div> {answeredA}</div>
                        </div>
                        <div className='column'>
                            <div className='b'>
                                <div>Ë</div>
                            </div>
                            <div className='b-choice' style={{ height: `${heightB}rem` }}></div>
                            <div className='answered-container'><div className='is-correct'>{bTick}</div> {answeredB}</div>
                        </div>
                        <div className='column'>
                            <div className='c'>
                                <div>Ì</div>
                            </div>
                            <div className='c-choice' style={{ height: `${heightC}rem` }}></div>
                            <div className='answered-container'><div className='is-correct'>{cTick}</div> {answeredC}</div>
                        </div>
                        <div className='column'>
                            <div className='d'>
                                <div>Í</div>
                            </div>
                            <div className='d-choice' style={{ height: `${heightD}rem` }}></div>
                            <div className='answered-container'><div className='is-correct'>{dTick}</div> {answeredD}</div>
                        </div>
                    </div>  
                </div>

                <div className='choices'>
                    <div className='top-choices'>
                        <div className='first-ans fi-ans' style={{ opacity: `${aOpacity}` }}><div className='spade'>Ê</div>{answers.a}</div>
                        <div className='second-ans se-ans' style={{ opacity: `${bOpacity}` }}><div className='heart'>Ë</div>{answers.b}</div>
                    </div>
                    <div className='bottom-choices'>
                        <div className='third-ans th-ans' style={{ opacity: `${cOpacity}` }}><div className='diamond'>Ì</div>{answers.c}</div>
                        <div className='fourth-ans fo-ans' style={{ opacity: `${dOpacity}` }}><div className='club'>Í</div>{answers.d}</div>
                    </div>
                        
                        
                    </div>
            </div>
        )
    }
}