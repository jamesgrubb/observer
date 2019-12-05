import {useEffect, useState, useRef} from 'react'
import {Player, Waveform} from 'tone'

export const useSound = (track) => {

    
    const [ loaded, setLoaded] = useState(false)
    const [ playerState, setPlayerState] = useState('')
    const [trackData, setTrackData] = useState([])
    
    const waveform = useRef(
        new Waveform(16)
    )
    const player = useRef(
        track && new Player(track,()=> setLoaded(true)).fan(waveform.current).toMaster()
    )
    const handlePlay = () => {
        player.current.start()
        setPlayerState(player.current.state)
    }
    
    // const dataLength = waveform.current.getValue().length
    const rAF = useRef()
    useEffect(()=> {
        const loop = () => {
            rAF.current = requestAnimationFrame(loop)
            const value = waveform.current.getValue()
            if(playerState === 'started'){
                setTrackData(value)                         
            }
            
            
                            
        }
        loop()
        return ()=> cancelAnimationFrame(rAF.current) 
    },[playerState])

 return [handlePlay, loaded, trackData]
}

