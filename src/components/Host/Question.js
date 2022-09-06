import React, { useState, useEffect } from 'react'
import { socket } from '../Global/Global'

const Question = props => {
    const [time, setTime] = useState(20)
    const [playersAnswered, setPlayersAnswered] = useState(0)
    // const [intervalId, setIntervalId] = useState('')
    const [started, setStarted] = useState(true)

    const timer = () => {
        setTime(time - 1)

        if (time <= 0) {
            // clearInterval(intervalId)
            const pin = props.pin
            socket.emit('question_end', pin)
            props.nextStep()
            setStarted(false)
        }
    }

    useEffect(() => {
        if (time > 0 && started) {
            const timer = setTimeout(() => setTime(time - 1), 1000)
        } else if (time <= 0) {
            const pin = props.pin
            socket.emit('question_end', pin)
            props.nextStep()
            setStarted(false)
        }

        socket.on('update_players_answered', playersAnswered => {
            setPlayersAnswered(playersAnswered)
        })

        socket.on('fetch_time', playerId => {
            const data = {
                pin: props.pin,
                playerId: playerId,
                time: time
            }

            socket.emit('send_time', data)
        })

        return () => {
            socket.off('update_players_answered')
            socket.off('fetch_time')
            // clearInterval(intervalId)
        }
    }, [time])

    const AnsweredLabel = () => {
        if (playersAnswered === 1) {
            return <span>answer</span>
        } else {
            return <span>answers</span>
        }
    }

    return (
        <div className='question container'>
            <div>
               <h1>{props.question}</h1> 
            </div>

            <div>
                <div>{time}</div>
                <div>
                    <div>{playersAnswered || 0}</div>
                    <div><AnsweredLabel /></div>
                </div>
            </div>

            <div className='choices'>
                <div><div></div>{props.answers.a}</div>
                <div><div></div>{props.answers.b}</div>
                <div><div></div>{props.answers.c}</div>
                <div><div></div>{props.answers.d}</div>
            </div>
        </div>
    )
}

export default Question

// export default class Question extends Component {
//     constructor() {
//         super()
//         this.state = {
//             time: 20,
//             playersAnswered: 0,
//             intervalId: ''
//         }
//     }

//     timer = () => {
//         this.setState({
//             time: this.state.time - 1
//         })

//         if  (this.state.time <= 0) {
//             clearInterval(this.state.intervalId)
//             const pin = this.props.pin
//             socket.emit('question_end', pin)
//             this.props.nextStep()
//         }
//     }

//     componentDidMount() {
//         const intervalId = setInterval(this.timer, 1000)
//         this.setState({
//             intervalId: intervalId
//         })

//         socket.on('update_players_answered', playersAnswered => {
//             this.setState({
//                 playersAnswered: playersAnswered
//             })
//         })

//         socket.on('fetch_time', playerId => {
            
//             const data = {
//                 pin: this.props.pin,
//                 playerId: playerId,
//                 time: this.state.time
//             }

//             socket.emit('send_time', data)
//         })
//     }

//     componentWillUnmount() {
//         socket.off('update_players_answered')
//         socket.off('fetch_time')
//         clearInterval(this.state.intervalId)
//     }

//     render() {

//         let name
        
//         if (this.state.playersAnswered === 1) {
//             name = <span>answer</span>
//         } else {
//             name = <span>answers</span>
//         }

//         const { pin, question, answers } = this.props

//         return (
//             <div className='question container'>
//                 <div>
//                     <h1>{question}</h1> 
//                 </div>

//                 <div>
//                     <div>{this.state.time}</div>
//                     <div>
//                         <div>{this.state.playersAnswered || 0}</div>
//                         <div>{name}</div>
//                     </div>
//                 </div>

//                 <div className='choices'>
//                     <div><div></div>{answers.a}</div>
//                     <div><div></div>{answers.b}</div>
//                     <div><div></div>{answers.c}</div>
//                     <div><div></div>{answers.d}</div>
//                 </div>
//             </div>
//         )
//     }
// }