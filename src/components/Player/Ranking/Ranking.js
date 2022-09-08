import React from 'react'
import TopBar from '../TopBar/TopBar'
import './Ranking.css'

const Ranking = ({ nickname, rank, score }) => {
    return (
        <div className='ranking'>
            <TopBar nickname={nickname}/>
            
            <div className='mid'>
                <Rank rank={rank} />
                <div className='end-score'>{score}</div>
            </div>
        </div>
        
    )
}

const Rank = ({ rank }) => {
    let finalRank

    if (rank === 1) {
        finalRank = <div className='end-rank'>1st place</div>
    } else if (rank === 2) {
        finalRank = <div className='end-rank'>2nd place</div>
    } else if (rank === 3) {
        finalRank = <div className='end-rank'>3rd place</div>
    } else {
        finalRank = <div className='end-rank'>{`${rank}th place`}</div>
    }

    return (
        <>{finalRank}</>
    )
}

export default Ranking