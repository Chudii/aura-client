import io from 'socket.io-client'
import React, { useEffect, useState } from 'react'

const socket = io.connect('http://localhost:3001')

const Global = () => {
    
    useEffect(() => {
        
    })
    
    console.log(socket)

    return null
}

export { Global, socket }