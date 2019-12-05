import React, { useEffect, useCallback, useRef } from 'react'
import {StyledCanvas, StyledCanvasContainer} from './Canvas.Styled'
import useResizeObserver from '../../hooks/useResizeObserver'
import { useSound } from '../../hooks/useSound'


const Canvas = () => {
    const track = useRef('https://res.cloudinary.com/makingthings/video/upload/v1568881368/mp3/go_for_landing.mp3')
    
    // The canvas
    const cnvRef = useRef()
    // requestAnimationFrame ID
    const rAF = useRef()
    // useSound animation data
    const [handlePlay, loaded, trackData ] = useSound(track.current) 
 
    // const animationData = useRef(data)


    useEffect(() => {
        
        const { width, height} = cnvRef.current
        const context = cnvRef.current.getContext('2d')
        const loop = () => {
            rAF.current = requestAnimationFrame(loop)
            console.log(trackData)

            context.clearRect(0, 0, width, height);
            
            context.fillRect(0,0, trackData[0] * 300, height/2);
        }
        loop()
        return()=> cancelAnimationFrame(rAF.current)
          
    })
    const [ref, {contentRect}] = useResizeObserver();
    const canvRef = useRef()
    const getContentRect = useCallback(( key ) => {
        return contentRect && Math.round(contentRect[key])
    }, [contentRect])
    console.log(canvRef.current)
 
 return (
<StyledCanvasContainer ref={ref}>
    <button disabled={!loaded} onClick = {handlePlay}>Play</button>
    <StyledCanvas ref={cnvRef} width={getContentRect('width')} height={300} />
</StyledCanvasContainer>)
}

export default Canvas