import React from 'react'
// import TopBar

const Result = ({ pin, questionNum, totalNumQuestions, nickname, lastCorrect, streak, rank, score }) => {
    return (
        <div className='player-result'>
            <div>{nickname} {pin}</div>

            <div>
                <div>
                    <div>
                        {
                            lastCorrect ? 
                            <>
                                <div>Correct</div>
                                <div>
                                    checked
                                </div>
                            </>
                            : 
                            <>
                                <div>Incorrect</div>
                                <div>
                                    closed
                                </div>
                            </>
                        }
                    </div>   
                </div>
                <div>
                    <div>
                        {
                            streak > 0 &&
                            <>
                                <div>Answer streak</div>
                                <div>{streak}</div>
                            </>
                        }
                    </div>
                </div>
                <div>
                    {
                        rank === 1 ?
                        <div>You are in 1st place</div> :
                        rank === 2 ?
                        <div>You are in 2nd place</div> :
                        rank === 3 ?
                        <div>You are in 3rd place</div> :
                        <div>{`You are in ${rank}th place`}</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Result