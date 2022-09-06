import React from 'react'

const Ranking = ({ nickname, rank, score }) => {
    return (
        <div className='ranking'>
            <div>{nickname}</div>
            
            <div>
                <Rank rank={rank} />
                <div>{score}</div>
            </div>
        </div>
        
    )
}

const Rank = ({ rank }) => {
    let finalRank

    if (rank === 1) {
        finalRank = <div>1st place</div>
    } else if (rank === 2) {
        finalRank = <div>2nd place</div>
    } else if (rank === 3) {
        finalRank = <div>3rd place</div>
    } else {
        finalRank = <div>{`${rank}th place`}</div>
    }

    return (
        <>{finalRank}</>
    )
}

export default Ranking